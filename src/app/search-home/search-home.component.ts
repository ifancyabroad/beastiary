import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate('400ms ease-out'))
    ])
  ]
})
export class SearchHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
