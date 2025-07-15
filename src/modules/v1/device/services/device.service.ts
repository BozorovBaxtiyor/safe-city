import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../repository/device_repository';

@Injectable()
export class DeviceService {
    constructor(private readonly deviceRepository: DeviceRepository) {}
}
