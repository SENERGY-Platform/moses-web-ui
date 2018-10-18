import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {StatesModel} from '../../states/shared/states.model';

@Component({
    templateUrl: './room-add-device-state-dialog.component.html',
    styleUrls: ['./room-add-device-state-dialog.component.css']
})
export class RoomAddDeviceStateDialogComponent {

    @Output() stateUserInput = {name: '', type: '', value: ''};
    @Output() types: string[] = ['string', 'number', 'boolean'];

    constructor(private dialogRef: MatDialogRef<RoomAddDeviceStateDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        const state: StatesModel = {name: this.stateUserInput.name, value: null};
        switch (this.stateUserInput.type) {
            case 'string': {
                state.value = this.stateUserInput.value;
                break;
            }
            case 'number': {
                state.value = parseFloat(this.stateUserInput.value);
                break;
            }
            case 'boolean': {
                if (this.stateUserInput.value === 'true') {
                    state.value = true;
                }

                if (this.stateUserInput.value === 'false') {
                    state.value = false;
                }
                break;
            }
        }
        this.dialogRef.close(state);
    }

}