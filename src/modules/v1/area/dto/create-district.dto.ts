import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
    @ApiProperty({
        example: 'Chilonzor',
        description: 'Name of the district',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Largest district in Tashkent',
        description: 'Description of the district',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: '1',
        description: 'ID of the region this district belongs to',
    })
    @IsString()
    @IsNotEmpty()
    region_id: string;
}
