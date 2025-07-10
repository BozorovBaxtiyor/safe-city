import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseEntity {
    @ApiProperty({
        example: 'OTP sent successfully',
        description: 'Response message',
    })
    message: string;
}

export class ValidateOtpResponseEntity {
    @ApiProperty({
        example: 'Password reset successful',
        description: 'Response message',
    })
    message: string;
}
