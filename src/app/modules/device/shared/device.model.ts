import {ServicesMapModel} from '../../services/shared/services-map.model';
import {StatesMapModel} from '../../states/shared/states-map.model';
import {ChangeRoutinesMapModel} from '../../change-routines/shared/change-routines-map.model';

export interface DeviceModel {
    id: string;
    name: string;
    image_url: string;
    external_ref: string;
    services: ServicesMapModel;
    states: StatesMapModel;
    change_routines: ChangeRoutinesMapModel;
}
