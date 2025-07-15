import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetObjectsQueryDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Page number', example: 1 })
    page?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Items per page', example: 10 })
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Region ID', required: false })
    region_id?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Project ID', required: false })
    project_id?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'District ID', required: false })
    district_id?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Order ID', required: false })
    order_id?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Design Type ID', required: false })
    des_type_id?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiPropertyOptional({ description: 'Design ID', required: false })
    des_id?: number;
}
