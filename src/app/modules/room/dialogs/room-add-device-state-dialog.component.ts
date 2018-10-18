import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ChangeRequestModel} from '../../change-routines/shared/change-request.model';

@Component({
    templateUrl: './room-add-device-state-dialog.component.html',
    styleUrls: ['./room-add-device-state-dialog.component.css']
})
export class RoomAddDeviceStateDialogComponent {

    @Output() changeRoutine: ChangeRequestModel = {ref_id: '', code: '', interval: 0, ref_type: ''};

    constructor(private dialogRef: MatDialogRef<RoomAddDeviceStateDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        this.dialogRef.close(this.changeRoutine);
    }

}