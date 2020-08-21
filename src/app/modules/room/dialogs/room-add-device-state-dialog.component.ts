import {Component, Output} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {StatesModel} from '../../../core/components/states/shared/states.model';

@Component({
    templateUrl: './room-add-device-state-dialog.component.html',
    styleUrls: ['./room-add-device-state-dialog.component.css']
})
export class RoomAddDeviceStateDialogComponent {


    @Output() name = '';
    @Output() valueType = '';
    @Output() valueString = '';
    @Output() valueNumber = 0;
    @Output() valueBoolean = false;
    @Output() types: string[] = ['string', 'number', 'boolean'];

    constructor(private dialogRef: MatDialogRef<RoomAddDeviceStateDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        const state: StatesModel = {name: this.name, type: this.valueType, value: ''};
        switch (this.valueType) {
            case 'string': {
                state.value = this.valueString;
                break;
            }
            case 'number': {
                state.value = this.valueNumber;
                break;
            }
            case 'boolean': {
                state.value = this.valueBoolean;
                break;
            }
        }

        this.dialogRef.close(state);
    }

}