import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class ExtraInfo {
    @ApiProperty({ example: 'v1.2.3' })
    firmware: string;

    @ApiProperty({ example: { lat: 41.3, lng: 69.2 } })
    location: Record<string, any>;
}

export class CreateDeviceDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the object associated with the device',
        type: Number,
        example: 1,
    })
    object_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the device model',
        type: Number,
        example: 1,
    })
    device_model_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the device type',
        type: Number,
        example: 1,
    })
    device_type_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the user who created the device',
        type: Number,
        example: 1,
    })
    created_by: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Serial number of the device',
        type: String,
        example: 'SN123456',
    })
    serial_number: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'IP address of the device',
        type: String,
        example: '192.168.1.1',
    })
    ip_address: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'MAC address of the device',
        type: String,
        example: '00:1A:2B:3C:4D:5',
    })
    mac_address: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Status of the device',
        type: String,
        example: 'active',
    })
    status?: string = 'active';

    @ApiProperty({
        description: 'Qo‘shimcha ma’lumotlar (json)',
        type: ExtraInfo,
    })
    @IsOptional()
    extra_info?: ExtraInfo;
}

