import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { JwtAuthModule } from "../auth/jwt-auth.module";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { ProjectService } from "./project.service";

@Module({
    imports: [DatabaseModule, JwtAuthModule],
    controllers: [ProjectController],
    providers: [ProjectRepository, ProjectService],
    exports: [ProjectRepository],
})

export class ProjectModule {}