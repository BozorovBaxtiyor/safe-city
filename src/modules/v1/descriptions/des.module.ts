import { Module } from "@nestjs/common";
import { JwtAuthModule } from "../auth/jwt-auth.module";
import { DatabaseModule } from "src/database/database.module";
import { DescriptionsController } from "./des.controller";
import { DescriptionsRepository } from "./des.reposityory";
import { DescriptionsService } from "./des.service";

@Module({
    imports: [JwtAuthModule , DatabaseModule],
    controllers: [DescriptionsController],
    providers: [DescriptionsRepository, DescriptionsService],
    exports: [DescriptionsRepository]
})

export class DescriptionsModule {}