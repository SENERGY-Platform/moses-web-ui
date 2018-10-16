export interface RoomModel {
    world: string;
    room: {
        id: string;
        name: string;
    };
    devices: {[key: string]: {
            id: string;
            name: string;
        }} | null ;
}

