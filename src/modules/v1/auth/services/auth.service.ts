// auth.service.ts
import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWT_ACCESS, JWT_REFRESH } from 'src/common/constants/jwt-constants';

import { IUser } from '../../../../common/types/types';
import { AuthRepository } from '../auth.repository';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { PaginationQueryUsersDto } from '../dto/get-all.users.input';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UpdateProfileDto } from '../dto/update.dto';
import { ValidateOtpDto } from '../dto/validate-otp.dto';
import {
    ForgotPasswordResponseEntity,
    ValidateOtpResponseEntity,
} from '../entity/forgot-password.entity';
import { LoginEntity } from '../entity/login.output';
import { RegisterEntity } from '../entity/register.output';
import { UpdateProfileEntity } from '../entity/update.output';
import { CacheService } from './cache.service';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        @Inject(JWT_ACCESS) private readonly jwtAccess: JwtService,
        @Inject(JWT_REFRESH) private readonly jwtRefresh: JwtService,
        private readonly cacheService: CacheService,
        private readonly mailService: MailService,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginEntity> {
        const user = await this.authRepository.findUserByUsername(loginDto.username);
        const isPasswordMatched = await bcrypt.compare(loginDto.password, user?.password || '');

        if (!user || isPasswordMatched === false) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const accessToken = await this.jwtAccess.signAsync({
            id: user.id,
            role: user.roll,
            username: user.username,
        });

        const refreshToken = await this.jwtRefresh.signAsync({ id: user.id });

        return { accessToken, refreshToken };
    }

    async register(registerDto: RegisterDto): Promise<RegisterEntity> {
        await this.checkIfUserOrEmailExists(registerDto.username, registerDto.email);

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        await this.authRepository.createUser(registerDto, hashedPassword);

        return {
            message: 'User registered successfully',
        };
    }

    async getUsers(query: PaginationQueryUsersDto): Promise<{ data: Partial<IUser>[] }> {
        const users = await this.authRepository.getUsers(query);
        return {
            data: users,
        };
    }

    async getUser(id: number): Promise<Partial<IUser>> {
        const user = await this.checkIfUserExists(id);

        return {
            id: user.id,
            avatar: user.avatar,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
        };
    }

    async updateProfile(
        updateProfileDto: UpdateProfileDto,
        profilePhoto: Express.Multer.File,
    ): Promise<UpdateProfileEntity> {
        const imageFilename = profilePhoto?.filename;
        await this.checkIfUserExists(updateProfileDto.userId);

        await this.checkIfUserOrEmailExists(
            updateProfileDto.username,
            updateProfileDto.email,
            updateProfileDto.userId,
        );

        await this.authRepository.updateUserProfile(updateProfileDto, imageFilename);

        return {
            message: 'Profile updated successfully',
        };
    }

    async deleteUser(
        id: number,
        currentUserId: number,
    ): Promise<{ status: string; message: string }> {
        this.throwIfSelfAction(id, currentUserId, 'delete');

        await this.checkIfUserExists(id);

        await this.authRepository.deleteUser(id);

        return { status: 'success', message: 'User deleted successfully' };
    }

    private async checkIfUserExists(userId: number): Promise<IUser> {
        const user = await this.authRepository.findUserById(userId);

        if (!user) {
            throw new HttpException(
                {
                    status: 'error',
                    message: `User with ID ${userId} not found`,
                },
                HttpStatus.NOT_FOUND,
            );
        }

        return user;
    }

    private async checkIfUserOrEmailExists(
        username: string,
        email: string,
        currentUserId?: number,
    ): Promise<IUser | null> {
        const user = await this.authRepository.findUserByUsernameOrEmail(username, email);

        if (user && user.id !== currentUserId) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'Username or email already taken',
                },
                HttpStatus.CONFLICT,
            );
        }

        return user ?? null;
    }

    async resetPassword(
        userId: number,
        currentPassword: string,
        newPassword: string,
    ): Promise<{ message: string }> {
        const user = await this.checkIfUserExists(userId);

        const matches = await bcrypt.compare(currentPassword, user.password);
        if (!matches) {
            throw new HttpException(
                { status: 'error', message: 'Current password is incorrect' },
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.authRepository.updatePasswordWithTransaction(userId, newPassword);

        return { message: 'Password reset successfully' };
    }

    private throwIfSelfAction(id: number, currentUserId: number, action: string): void {
        if (id === currentUserId) {
            throw new HttpException(
                {
                    status: 'error',
                    message: `You cannot ${action} your own account`,
                },
                HttpStatus.FORBIDDEN,
            );
        }
    }

    async refreshToken(userId: number): Promise<LoginEntity> {
        const user = await this.authRepository.findUserById(userId);

        if (!user) {
            throw new UnauthorizedException('Invalid user ID');
        }

        const accessToken = await this.jwtAccess.signAsync({
            id: user.id,
            role: user.roll,
            username: user.username,
        });

        const refreshToken = await this.jwtRefresh.signAsync({ id: user.id });

        return { accessToken, refreshToken };
    }

    async forgotPassword(
        forgotPasswordDto: ForgotPasswordDto,
    ): Promise<ForgotPasswordResponseEntity> {
        const user = await this.authRepository.findUserByUsernameOrEmail(
            '',
            forgotPasswordDto.email,
        );

        if (!user) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'User with this email not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to Redis cache with 5-minute expiration
        await this.cacheService.setOtp(forgotPasswordDto.email, otp);

        // Send OTP via email
        await this.mailService.sendOtp(forgotPasswordDto.email, otp);

        return {
            message: 'Password reset OTP has been sent to your email',
        };
    }

    async validateOtp(validateOtpDto: ValidateOtpDto): Promise<ValidateOtpResponseEntity> {
        const { email, otp, newPassword } = validateOtpDto;

        // Get stored OTP from Redis
        const storedOtp = await this.cacheService.getOtp(email);

        if (!storedOtp) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'OTP has expired',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (storedOtp !== otp) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'Invalid OTP',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.authRepository.findUserByUsernameOrEmail('', email);

        if (!user) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'User not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        // Update password
        await this.authRepository.updatePasswordWithTransaction(user.id, newPassword);

        // Delete OTP from cache after successful validation
        await this.cacheService.deleteOtp(email);

        return {
            message: 'Password has been reset successfully',
        };
    }
}
