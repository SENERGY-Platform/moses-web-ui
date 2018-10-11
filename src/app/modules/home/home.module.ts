import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule
    ],
    declarations: [
        HomeComponent,
    ]
})
export class HomeModule {
}
