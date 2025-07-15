import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";

@Injectable()
export class DeviceRepository { 
    constructor(@InjectKnex() private readonly knex: Knex) {}
}