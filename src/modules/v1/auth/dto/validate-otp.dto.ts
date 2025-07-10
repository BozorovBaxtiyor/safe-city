import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class ValidateOtpDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address used for password reset request',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Six-digit OTP code received via email',
    })
    @IsString()
    @Length(6, 6)
    @Matches(/^[0-9]+$/, { message: 'OTP must contain only numbers' })
    otp: string;

    @ApiProperty({
        example: 'NewStrongPass123!',
        description: 'New password',
    })
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    newPassword: string;
}
