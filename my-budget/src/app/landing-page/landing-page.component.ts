import { Component, OnInit } from '@angular/core';

import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {


  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService.isLoggedIn();
  }

  getStarted(username) {
    this.mainService.getStarted(username);
  }

}
