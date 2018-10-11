import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';

const init = {path: '', redirectTo: '/home', pathMatch: 'full'};
const start = {path: 'home', pathMatch: 'full', component: HomeComponent};

@NgModule({
    imports: [RouterModule.forRoot([init, start])]
})
export class AppRoutingModule {

}


