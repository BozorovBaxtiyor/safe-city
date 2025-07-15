import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AreaModule } from '../area/area.module';
import { AuthModule } from '../auth/auth.module';
import { DescriptionsModule } from '../descriptions/des.module';
import { ProjectModule } from '../projects/project.module';
import { ObjectController } from './object.controller';
import { ObjectRepository } from './object.repository';
import { ObjectService } from './object.service';

@Module({
    imports: [DatabaseModule, AuthModule, ProjectModule, AreaModule, DescriptionsModule],
    providers: [ObjectRepository, ObjectService],
    controllers: [ObjectController],
    exports: [ObjectService, ObjectRepository],
})
export class ObjectModule {}
