import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { DeviceModelController } from './controllers/device_model.controller';
import { DeviceTypeController } from './controllers/device_type.controller';
import { DeviceModelRepository } from './repository/device_model.repository';
import { DeviceTypeRepository } from './repository/device_type.repository';
import { DeviceModelService } from './services/device_model.service';
import { DeviceTypeService } from './services/device_type.service';

@Module({
    imports: [AuthModule, DatabaseModule],
    providers: [DeviceTypeRepository, DeviceTypeService, DeviceModelRepository, DeviceModelService],
    exports: [],
    controllers: [DeviceTypeController, DeviceModelController],
})
export class DeviceModule {}
