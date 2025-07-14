import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDesTypeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the description type',
        example: 'Incident Report',
        required: true,
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Description of the description type',
        example: 'This type is used for reporting incidents',
        required: false,
    })
    description?: string;
   
}