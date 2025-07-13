import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the project',
        example: 'Project Alpha',
        required: true,
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Description of the project',
        example: 'This project involves...',
        required: false,
    })
    description?: string;
}
