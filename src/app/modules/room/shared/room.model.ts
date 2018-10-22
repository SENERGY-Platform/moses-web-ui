import {DeviceMapModel} from '../../device/shared/device-map.model';
import {StatesMapModel} from '../../../core/components/states/shared/states-map.model';

export interface RoomModel {
    id: string;
    name: string;
    devices: DeviceMapModel | null;
    states: StatesMapModel | null;
}

