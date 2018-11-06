import {DeviceMapModel} from '../../device/shared/device-map.model';
import {StatesMapModel} from '../../../core/components/states/shared/states-map.model';
import {ChangeRoutinesMapModel} from '../../change-routines/shared/change-routines-map.model';

export interface RoomModel {
    id: string;
    name: string;
    devices: DeviceMapModel | null;
    states: StatesMapModel | null;
    change_routines: ChangeRoutinesMapModel | null;
}

