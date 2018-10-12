import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {WorldComponent} from './world.component';

const world = {path: 'world', pathMatch: 'full', component: WorldComponent, data: {header: 'World'}};

@NgModule({
    imports: [RouterModule.forChild([world])],
    declarations: [
        WorldComponent,
    ],
})
export class WorldModule {
}
