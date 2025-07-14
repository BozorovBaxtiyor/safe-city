import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDescriptionDto { 
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Name of the description',
        example: 'Updated Description Example',
        required: false,
    })
    name?: string;
    
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: 'ID of the description',
        example: 1,
        required: false,
    })
    des_id?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Optional description text',
        example: 'This is an updated example description',
        required: false,
    })
    description?: string;
}