import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AreaController } from './area.controller';
import { AreaRepository } from './area.repository';
import { AreaService } from './area.service';
import { JwtAuthModule } from '../auth/jwt-auth.module';

@Module({
    imports: [DatabaseModule , JwtAuthModule],
    controllers: [AreaController],
    providers: [AreaService, AreaRepository],
    exports: [AreaRepository],
})
export class AreaModule {}
