import { Injectable } from "@nestjs/common";
import { ObjectRepository } from "./object.repository";

@Injectable()
export class ObjectService{
    constructor(private readonly objectRepository: ObjectRepository) {}
}