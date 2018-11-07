import {StatesMapModel} from '../../../core/components/states/shared/states-map.model';
import {ChangeRoutinesMapModel} from '../../change-routines/shared/change-routines-map.model';

export interface WorldModel {
    id: string;
    name: string;
    rooms: {[key: string]: {
            id: string;
            name: string;
        }} | null ;
    states: StatesMapModel | null;
    change_routines: ChangeRoutinesMapModel | null;
}

