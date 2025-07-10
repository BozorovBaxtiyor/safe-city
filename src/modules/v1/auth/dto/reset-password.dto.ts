// reset-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'User ID whose password needs to be reset',
        example: '11',
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Current password',
        example: 'OldStrongPass123!',
    })
    @IsString()
    @MinLength(8)
    currentPassword: string;

    @ApiProperty({
        description: 'New password',
        example: 'NewStrongPass123!',
    })
    @IsString()
    @MinLength(8)
    newPassword: string;
}
