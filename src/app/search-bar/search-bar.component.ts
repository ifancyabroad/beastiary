import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('hide', style({transform: 'translateY(-100%)'})),
      transition('hide <=> *', animate('500ms ease-out'))
    ]),
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', animate('400ms ease-out'))
    ])
  ]
})
export class SearchBarComponent implements OnInit {

  firstSearch = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: RouterEvent) => {
      this.firstSearch = event.url === '/';
    });
  }
}
