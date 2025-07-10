// login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'superadmin', description: 'Username for login' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'superadmin', description: 'Password for login' })
    @IsString()
    @MinLength(8)
    password: string;
}
