import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import {
    ApiBadRequestResponse,
    ApiCreate,
    ApiDelete,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from 'src/common/swagger/common-swagger';
import { IDistrict, IRegion } from 'src/common/types/types';
import { AreaService } from './area.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@Controller('area')
@UseGuards(JwtHttpAuthGuard)
@ApiTags('Area Management')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse('Bad request')
@ApiInternalServerErrorResponse('Internal server error')
@ApiForbiddenResponse()
export class AreaController {
    constructor(private readonly areaService: AreaService) {}

    @Post('region')
    @Role(UserRole.SUPERADMIN)
    @ApiBody({ type: CreateRegionDto })
    @ApiCreate('Region', CreateRegionDto)
    async createRegion(@Body() createRegionDto: CreateRegionDto): Promise<IRegion> {
        return this.areaService.createRegion(createRegionDto);
    }

    @Get('regions')
    async getAllRegions(): Promise<{ regions: IRegion[] }> {
        return this.areaService.getAllRegions();
    }

    @Get('region/:id')
    @ApiParam({ name: 'id', type: 'number' })
    async getRegionById(@Param('id') id: number): Promise<IRegion> {
        return this.areaService.getRegionById(id);
    }

    @Put('region/:id')
    @Role(UserRole.SUPERADMIN)
    @ApiParam({ name: 'id', type: 'number' })
    async updateRegion(
        @Param('id') id: number,
        @Body() updateData: Partial<IRegion>,
    ): Promise<IRegion> {
        return this.areaService.updateRegion(id, updateData);
    }

    @Delete('region/:id')
    @Role(UserRole.SUPERADMIN)
    @ApiDelete('Region')
    @ApiParam({ name: 'id', type: 'number' })
    async deleteRegion(@Param('id') id: number): Promise<{ message: string }> {
        return this.areaService.deleteRegion(id);
    }

    @Post('district')
    @Role(UserRole.SUPERADMIN)
    @ApiBody({ type: CreateDistrictDto })
    @ApiCreate('District', CreateDistrictDto)
    async createDistrict(@Body() createDistrictDto: CreateDistrictDto): Promise<IDistrict> {
        return this.areaService.createDistrict(createDistrictDto);
    }

    @Get('districts')
    @ApiQuery({ name: 'regionId', required: false, type: 'number' })
    async getAllDistricts(@Query('regionId') regionId: number): Promise<{ data: IDistrict[] }> {
        return this.areaService.getAllDistricts(regionId);
    }

    @Get('district/:id')
    @ApiParam({ name: 'id', type: 'number' })
    async getDistrictById(@Param('id') id: number): Promise<IDistrict> {
        return this.areaService.getDistrictById(id);
    }

    @Get('region/:regionId/districts')
    @ApiParam({ name: 'regionId', type: 'string' })
    async getDistrictsByRegionId(@Param('regionId') regionId: string): Promise<IDistrict[]> {
        return this.areaService.getDistrictsByRegionId(regionId);
    }

    @Put('district/:id')
    @Role(UserRole.SUPERADMIN)
    @ApiParam({ name: 'id', type: 'number' })
    async updateDistrict(
        @Param('id') id: number,
        @Body() updateData: Partial<IDistrict>,
    ): Promise<IDistrict> {
        return this.areaService.updateDistrict(id, updateData);
    }

    @Delete('district/:id')
    @Role(UserRole.SUPERADMIN)
    @ApiDelete('District')
    @ApiParam({ name: 'id', type: 'number' })
    async deleteDistrict(@Param('id') id: number): Promise<{ message: string }> {
        return this.areaService.deleteDistrict(id);
    }
}
