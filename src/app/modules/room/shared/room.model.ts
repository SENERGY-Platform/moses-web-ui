import {DeviceMapModel} from '../../device/shared/device-map.model';

export interface RoomModel {
    id: string;
    name: string;
    devices: DeviceMapModel | null;
}

