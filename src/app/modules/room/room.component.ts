import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RoomService} from './shared/room.service';
import {RoomResponseModel} from './shared/room-response.model';

@Component({
    selector: 'moses-home',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @Output() room: RoomResponseModel = {world: '', room: {id: '', name: ''}};

    constructor(private activatedRoute: ActivatedRoute,
                private roomService: RoomService,
                ) {
    }

    ngOnInit() {
        this.init();
    }

    add() {

    }

    delete() {

    }

    private init() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.roomService.get(params['roomid']).subscribe((roomResponse: RoomResponseModel | null) => {
                    if (roomResponse !== null) {
                        this.room = roomResponse;
                    }
                });
            }
        );
    }

}
