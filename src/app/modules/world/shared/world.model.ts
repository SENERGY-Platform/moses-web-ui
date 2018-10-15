import {RoomModel} from '../../room/shared/room.model';

export interface WorldModel {
    id: string;
    name: string;
    rooms: {[key: string]: RoomModel} | null ;
}

