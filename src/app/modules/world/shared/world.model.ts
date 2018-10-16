export interface WorldModel {
    id: string;
    name: string;
    rooms: {[key: string]: {
            id: string;
            name: string;
        }} | null ;
}

