import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateObjectDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the project',
        example: 1,
        required: true,
    })
    project_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the order',
        example: 1,
        required: true,
    })
    order_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Type of the description',
        example: 1,
        required: true,
    })
    des_type_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the description',
        example: 1,
        required: true,
    })
    des_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the region',
        example: 1,
        required: true,
    })
    region_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID of the district',
        example: 1,
        required: true,
    })
    district_id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Name of the object',
        example: 'Main Office',
        required: false,
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name and address of the object',
        example: '123 Main St',
        required: true,
    })
    address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Latitude of the object location',
        example: '40.7128',
        required: true,
    })
    latitude: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Longitude of the object location',
        example: '-74.0060',
        required: true,
    })
    longitude: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'IP subnet of the object',
        example: '192.168.1.0/24',
        required: true,
    })
    ip_subnet: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Connection type of the object',
        example: 'Wired',
        required: true,
    })
    connection_type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Speed of the connection',
        example: '100 Mbps',
        required: true,
    })
    speed: string;
}
