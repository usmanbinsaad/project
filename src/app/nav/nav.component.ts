import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  addsec: any = true;
  viewsec: any;
  constructor() {}
  ngOnInit(): void {}

  adduser() {
    this.addsec = true;
    this.viewsec = false;
  }
  viewUser() {
    this.addsec = false;
    this.viewsec = true;
  }

  onButtonGroupClick($event: any) {
    let clickedElement = $event.target;

    if (clickedElement.nodeName === 'BUTTON') {
      let isCertainButtonAlreadyActive =
        clickedElement.parentElement.querySelector('.active');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.className += ' active';
    }
  }
}
