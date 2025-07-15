import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateObjectDto {
    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the project',
        example: 1,
        required: false,
    })
    project_id?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the order',
        example: 1,
        required: false,
    })
    order_id?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'Type of the description',
        example: 1,
        required: false,
    })
    des_type_id?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the description',
        example: 1,
        required: false,
    })
    des_id?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the region',
        example: 1,
        required: false,
    })
    region_id?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: 'ID of the district',
        example: 1,
        required: false,
    })
    district_id?: number;
    
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Name of the object',
        example: 'Main Office',
        required: false,
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Name and address of the object',
        example: '123 Main St',
        required: false,
    })
    address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Latitude of the object location',
        example: '40.7128',
        required: false,
    })
    latitude?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Longitude of the object location',
        example: '-74.0060',
        required: false,
    })
    longitude?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'IP subnet of the object',
        example: '192.168.1.0/24',
        required: false,
    })
    ip_subnet?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Connection type of the object',
        example: 'Wired',
        required: false,
    })
    connection_type?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Speed of the connection',
        example: '100 Mbps',
        required: false,
    })
    speed?: string;
}
