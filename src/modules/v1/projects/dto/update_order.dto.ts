import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Unique identifier for the order',
        example: 'BH-12345',
        required: false,
    })
    order_number?: string;

    @ApiProperty({
        description: 'Description of the order',
        example: 'This is a sample order description',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'ID of the project associated with the order',
        example: 1,
        required: false,
    })
    project_id?: number;
}
