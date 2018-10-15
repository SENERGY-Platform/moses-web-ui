import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';

const init = {path: '', redirectTo: 'home/start', pathMatch: 'full'};
const start = {path: 'home/start', pathMatch: 'full', component: HomeComponent};

@NgModule({
    imports: [RouterModule.forRoot([init, start])]
})
export class AppRoutingModule {

}


