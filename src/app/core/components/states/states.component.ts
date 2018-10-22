import {Component, Input, OnInit} from '@angular/core';
import {RoomResponseModel} from '../../../modules/room/shared/roomResponse.model';
import {RoomService} from '../../../modules/room/shared/room.service';
import {WorldModel} from '../../../modules/world/shared/world.model';
import {WorldService} from '../../../modules/world/shared/world.service';

@Component({
  selector: 'moses-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  @Input() type = '';
  @Input() room: RoomResponseModel = {world: '', room: {id: '', name: '', devices: null}};
  @Input() world: WorldModel = {id: '', name: '', rooms: null};


  constructor(private roomService: RoomService,
              private worldService: WorldService) { }

  ngOnInit() {

  }

  delete(): void {
    switch (this.type) {
        case 'Room': {
            this.roomService.openRoomDeleteDialog(this.room);
            break;
        }
        case 'World': {
            console.log(this.world);
            this.worldService.openDeleteDialog(this.world);
            break;
        }
    };
  }



}
