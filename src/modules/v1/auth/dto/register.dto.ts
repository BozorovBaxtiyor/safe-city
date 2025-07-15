// register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(3)
    @ApiProperty({
        description: 'Username must be at least 3 characters long',
        example: 'john_doe',
        minLength: 3,
        uniqueItems: true,
    })
    username: string;

    @IsEmail()
    @ApiProperty({
        description: 'Email must be a valid email address',
        example: 'example@example.com',
    })
    email: string;

    @IsString()
    @MinLength(4)
    @ApiProperty({
        description: 'Full name must be at least 4 characters long',
        example: 'John Doe',
        minLength: 4,
    })
    fullName: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    @ApiProperty({
        description: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character',
        example: 'P@ssw0rd!',
        minLength: 8,
    })
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Optional user role, defaults to "user"',
        example: 'user',
        default: 'user',
    })
    roll?: string;

    @IsNumber()
    @ApiProperty({
        description: 'Region ID must be a valid number',
        example: 1,
        type: Number,
        required: true,
    })
    region_id: number;
}
