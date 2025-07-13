import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Unique identifier for the order',
        example: 'BH-12345',
        required: true,
    })
    order_number: string;

    @ApiProperty({
        description: 'Description of the order',
        example: 'This is a sample order description',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the project associated with the order',
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    project_id: number;
}