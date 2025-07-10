import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProfileDto {
    @ApiProperty({ example: 2, description: 'User ID to update profile' })
    @Type(() => Number) // String -> Number transformatsiya
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 'admin',
        description: 'Username (3-20 characters)',
        required: true,
    })
    @IsString()
    @MinLength(3)
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Username can only contain letters, numbers, underscores and hyphens',
    })
    username: string;

    @ApiProperty({
        example: 'New Admin Name',
        description: 'Full name',
        required: true,
    })
    @IsString()
    @MinLength(2)
    fullName: string;

    @ApiProperty({
        example: 'admin@example.com',
        description: 'Valid email address',
        required: true,
    })
    @IsEmail()
    email: string;
}
