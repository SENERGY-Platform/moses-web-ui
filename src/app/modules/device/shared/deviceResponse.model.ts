import {DeviceMapModel} from './device-map.model';

export interface DeviceResponseModel {
    world: string;
    room: string;
    device: DeviceMapModel;
}

