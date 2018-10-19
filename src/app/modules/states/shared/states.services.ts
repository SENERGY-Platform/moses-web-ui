import {Injectable} from '@angular/core';
import {StatesModel} from './states.model';
import {StatesMapModel} from './states-map.model';

@Injectable({
    providedIn: 'root'
})
export class StatesServices {

    constructor() {
    }

    convertArrayToMap(states: StatesModel[]): StatesMapModel {
        const statesMap: StatesMapModel = {};
        states.forEach((state: StatesModel) => {
            statesMap[state.name] = this.convertValue(state.type, state.value);
        });
        return statesMap;
    }

    convertValue(stateType: string, stateValue: (string | number | boolean | null)): (string | number | boolean | null)  {
        let convertedValue: string | number | boolean | null = null;
        switch (stateType) {
            case 'string': {
                convertedValue = stateValue;
                break;
            }
            case 'number': {
                convertedValue = parseFloat(<string>stateValue);
                break;
            }
            case 'boolean': {
                if (stateValue === 'true') {
                    convertedValue = true;
                }
                if (stateValue === 'false') {
                    convertedValue = false;
                }
                break;
            }
        }
        return convertedValue;
    }
}
