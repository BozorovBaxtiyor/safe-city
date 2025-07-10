// auth.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from 'src/common/swagger/common-swagger';

import { multerUpdateProfileConfig } from 'src/common/config/multer/auth.config';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { JwtRefreshGuard } from 'src/common/guards/auth/jwt-refresh.guard';
import { HttpRoleGuard } from 'src/common/guards/roles/roles.guard';
import { ICustomRequest, IUser } from '../../../common/types/types';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { PaginationQueryUsersDto } from './dto/get-all.users.input';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update.dto';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import {
    ForgotPasswordResponseEntity,
    ValidateOtpResponseEntity,
} from './entity/forgot-password.entity';
import { GetAllUsersOutput } from './entity/get-allUsers.output';
import { LoginEntity } from './entity/login.output';
import { RegisterEntity } from './entity/register.output';
import { UpdateProfileEntity } from './entity/update.output';
import { AuthService } from './services/auth.service';

@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Controller('auth')
@Role(UserRole.SUPERADMIN)
@ApiTags('Auth')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiNotFoundResponse('User not found')
@ApiInternalServerErrorResponse('Internal server error')
@ApiBadRequestResponse('Bad request')
@ApiForbiddenResponse()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOkResponse('Successful login', LoginEntity)
    async login(@Body() loginDto: LoginDto): Promise<LoginEntity> {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiOkResponse('Successful registration', RegisterEntity)
    async register(@Body() registerDto: RegisterDto): Promise<RegisterEntity> {
        return this.authService.register(registerDto);
    }

    @Get('users')
    @ApiOkResponse('List of users', GetAllUsersOutput)
    async getUsers(@Query() query: PaginationQueryUsersDto): Promise<{ data: Partial<IUser>[] }> {
        return this.authService.getUsers(query);
    }

    @Get('user')
    @ApiQuery({
        name: 'id',
        required: false,
        description: 'User ID (optional). If omitted, returns authenticated user.',
    })
    async getUser(@Req() req: ICustomRequest, @Query('id') id?: number): Promise<Partial<IUser>> {
        return this.authService.getUser(id || req.user.id);
    }

    @Put('update-profile')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('profilePhoto', multerUpdateProfileConfig))
    @ApiBody({ type: UpdateProfileDto })
    async updateProfile(
        @UploadedFile() profilePhoto: Express.Multer.File,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<UpdateProfileEntity> {
        return this.authService.updateProfile(updateProfileDto, profilePhoto);
    }

    @Delete('delete-user/:id')
    async deleteUser(
        @Query('id') id: number,
        @Req() req: ICustomRequest,
    ): Promise<{ status: string; message: string }> {
        return this.authService.deleteUser(id, req.user?.id);
    }

    @Put('reset-password')
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        return this.authService.resetPassword(
            resetPasswordDto.userId,
            resetPasswordDto.currentPassword,
            resetPasswordDto.newPassword,
        );
    }

    @Post('refresh-token')
    @Public()
    @UseGuards(JwtRefreshGuard)
    async refreshToken(@Req() req: ICustomRequest): Promise<LoginEntity> {
        return this.authService.refreshToken(req.user.id);
    }

    @Post('forgot-password')
    @Public()
    @ApiBody({ type: ForgotPasswordDto })
    @ApiOkResponse('OTP sent successfully', ForgotPasswordResponseEntity)
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
    ): Promise<ForgotPasswordResponseEntity> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('validate-otp')
    @Public()
    @ApiBody({ type: ValidateOtpDto })
    @ApiOkResponse('Password reset successful', ValidateOtpResponseEntity)
    async validateOtp(@Body() validateOtpDto: ValidateOtpDto): Promise<ValidateOtpResponseEntity> {
        return this.authService.validateOtp(validateOtpDto);
    }
}
