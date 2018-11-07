import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {WorldService} from './shared/world.service';
import {WorldModel} from './shared/world.model';

@Component({
    selector: 'moses-world',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

    world: WorldModel = {id: '', name: '', rooms: null, states: null, change_routines: null};

    constructor(private activatedRoute: ActivatedRoute,
                private worldService: WorldService) {
    }

    ngOnInit() {
        this.init();
    }

    add() {
        this.worldService.openCreateRoomDialog(this.world);
    }

    private init() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.worldService.get(params['worldid']).subscribe((world: WorldModel | null) => {
                    if (world !== null) {
                        this.world = world ;
                    }
                });
            }
        );
    }

}
