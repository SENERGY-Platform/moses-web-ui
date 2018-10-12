import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeNewWorldDialogComponent} from './dialogs/home-new-world-dialog.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [
        HomeComponent,
        HomeNewWorldDialogComponent
    ],
    entryComponents: [HomeNewWorldDialogComponent],
})
export class HomeModule {
}
