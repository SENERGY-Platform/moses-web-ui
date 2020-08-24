import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
        MatTooltipModule,
    ],
    declarations: [
        HomeComponent,
        HomeNewWorldDialogComponent
    ],
})
export class HomeModule {
}
