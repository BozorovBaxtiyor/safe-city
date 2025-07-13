import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AreaModule } from './modules/v1/area/area.module';
import { AuthModule } from './modules/v1/auth/auth.module';
import { JwtAuthModule } from './modules/v1/auth/jwt-auth.module';
import { ProjectModule } from './modules/v1/projects/project.module';

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
        ProjectModule
    ],
})
export class AppModule {}
