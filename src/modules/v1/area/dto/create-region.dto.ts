import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
    @ApiProperty({
        example: 'Toshkent',
        description: 'Name of the region',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Capital city of Uzbekistan',
        description: 'Description of the region',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 'Uzbekistan',
        description: 'Country of the region',
        default: 'Uzbekistan',
    })
    @IsString()
    country?: string;
}
