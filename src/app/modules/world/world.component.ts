import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'moses-home',
    templateUrl: './world.component.html',
    styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

    private id = '';

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.initId();
    }

    add() {
        console.log('add');
    }

    delete() {

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
