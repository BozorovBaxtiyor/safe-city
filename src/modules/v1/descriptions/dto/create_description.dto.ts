import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDescriptionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the description',
        example: 'Description Example',
        required: true,
    })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'ID of the description',
        example: 1,
        required: true,
    })
    des_id: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Optional description text',
        example: 'This is an example description',
        required: false,
    })
    description?: string;
}
