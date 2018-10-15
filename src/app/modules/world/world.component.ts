import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {WorldService} from './shared/world.service';

@Component({
    selector: 'moses-home',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

    private id = '';

    constructor(private activatedRoute: ActivatedRoute,
                private worldService: WorldService) {
    }

    ngOnInit() {
        this.initId();
    }

    add() {
        console.log('add');
    }

    delete() {
        this.worldService.openDeleteDialog(this.id);
    }

    private initId() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                console.log(this.id);
            }
        );
    }

}
