import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {StatesModel} from '../../states/shared/states.model';
import {StatesServices} from '../../states/shared/states.services';

@Component({
    templateUrl: './room-add-device-state-dialog.component.html',
    styleUrls: ['./room-add-device-state-dialog.component.css']
})
export class RoomAddDeviceStateDialogComponent {

    @Output() state: StatesModel = {name: '', type: '', value: ''};
    @Output() types: string[] = ['string', 'number', 'boolean'];

    constructor(private dialogRef: MatDialogRef<RoomAddDeviceStateDialogComponent>,
                private statesServices: StatesServices) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        /**  convert value in correct datatype */
        this.state.value = this.statesServices.convertValue(this.state.type, this.state.value);
        this.dialogRef.close(this.state);
    }

}