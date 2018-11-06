import {Component, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ChangeRequestModel} from '../shared/change-request.model';

@Component({
    templateUrl: './change-routine-add-dialog.component.html',
    styleUrls: ['./change-routine-add-dialog.component.css']
})
export class ChangeRoutineAddDialogComponent {

    @Output() changeRoutine: ChangeRequestModel = {ref_id: '', code: '', interval: 0, ref_type: ''};

    constructor(private dialogRef: MatDialogRef<ChangeRoutineAddDialogComponent>) {

    }

    close(): void {
        this.dialogRef.close();
    }

    create(): void {
        this.dialogRef.close(this.changeRoutine);
    }

}