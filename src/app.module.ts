import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AreaModule } from './modules/v1/area/area.module';
import { AuthModule } from './modules/v1/auth/auth.module';
import { JwtAuthModule } from './modules/v1/auth/jwt-auth.module';
import { DescriptionsModule } from './modules/v1/descriptions/des.module';
import { ProjectModule } from './modules/v1/projects/project.module';
import { DeviceModule } from './modules/v1/device/device.module';
import { ObjectModule } from './modules/v1/objects/object.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        JwtAuthModule,
        DatabaseModule,
        AuthModule,
        AreaModule,
        ProjectModule,
        DescriptionsModule,
        DeviceModule,
        ObjectModule
    ],
})
export class AppModule {}
