import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AuthModule } from "../auth/auth.module";
import { ObjectRepository } from "./object.repository";
import { ObjectService } from "./object.service";
import { ObjectController } from "./object.controller";

@Module({
    imports: [DatabaseModule , AuthModule],
    providers: [ObjectRepository , ObjectService],
    controllers: [ObjectController],
})

export class ObjectModule {}