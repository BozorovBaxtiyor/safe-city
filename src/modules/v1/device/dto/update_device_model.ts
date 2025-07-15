import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeviceModelDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Name of the device model',
        example: 'Model X',
        required: false
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Description of the device model',
        example: 'This is a sample device model',
        required: false,
    })
    description?: string;
    
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the device type',
        example: 1,
        required: false,
    })
    device_type_id?: number;
}
