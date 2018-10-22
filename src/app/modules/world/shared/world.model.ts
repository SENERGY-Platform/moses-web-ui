import {StatesMapModel} from '../../../core/components/states/shared/states-map.model';

export interface WorldModel {
    id: string;
    name: string;
    rooms: {[key: string]: {
            id: string;
            name: string;
        }} | null ;
    states: StatesMapModel | null;
}

