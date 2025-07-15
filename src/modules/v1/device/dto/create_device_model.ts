import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeviceModelDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the device model',
        example: 'Model X',
        required: true,
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Description of the device model',
        example: 'This is a sample device model',
        required: false,
    })
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: 'ID of the device type',
        example: 1,
        required: true,
    })
    device_type_id: number;
}
