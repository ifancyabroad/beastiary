import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('show', style({transform: 'translateY(0)'})),
      state('hide', style({transform: 'translateY(-100%)'})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]),
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class SearchBarComponent implements OnInit {

  firstSearch = false;

  constructor(private location: Location) { }

  ngOnInit() {
    if (!this.location.path()) { this.firstSearch = true; }
  }

  setFirstSearch(e) {
    this.firstSearch = e;
  }
}
