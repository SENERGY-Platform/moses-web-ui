import { Component, OnInit } from '@angular/core';
import {HomeService} from './shared/home.service';

@Component({
  selector: 'moses-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit() {

  }

  add(): void {
    this.homeService.openNewWorldDialog();
  }

  addWorld(): void {
    console.log('add world');
  }

}
