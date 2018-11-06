import {NgModule} from '@angular/core';
import {
MatButtonModule,
MatDialogModule, MatDividerModule,
MatFormFieldModule,
MatGridListModule, MatIconModule,
MatInputModule,
MatMenuModule, MatRadioModule,
MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CoreModule} from '../../core/core.module';
import {ChangeRoutineEditDialogComponent} from './dialog/change-routine-edit-dialog.component';
import {ChangeRoutineAddDialogComponent} from './dialog/change-routine-add-dialog.component';

@NgModule({
    imports: [
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        CommonModule,
        MatDividerModule,
        MatMenuModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatSliderModule,
        CoreModule,
        ],
    declarations: [
        ChangeRoutineEditDialogComponent,
        ChangeRoutineAddDialogComponent
    ],
    entryComponents: [ChangeRoutineEditDialogComponent,
        ChangeRoutineAddDialogComponent,
    ],
})
export class ChangeRoutinesModule {
}
