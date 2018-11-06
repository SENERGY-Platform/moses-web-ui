import {NgModule} from '@angular/core';
import {ChangeRoutineEditDialogComponent} from './shared/change-routine-edit-dialog.component';
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
    ],
    entryComponents: [ChangeRoutineEditDialogComponent,
    ],
})
export class ChangeRoutinesModule {
}
