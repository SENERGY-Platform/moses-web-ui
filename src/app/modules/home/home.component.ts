import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moses-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  addWorld(): void {
    console.log('add world');
  }

}
