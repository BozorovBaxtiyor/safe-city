import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeviceTypeDto { 
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the device type',
        example: 'Smartphone'   
    })
    name: string;
}