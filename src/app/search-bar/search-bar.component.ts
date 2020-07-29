import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('hide', style({transform: 'translateY(-100%)'})),
      transition('hide <=> *', animate('500ms ease-out'))
    ])
  ]
})
export class SearchBarComponent implements OnInit {

  firstSearch = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.firstSearch = event.urlAfterRedirects === '/';
    });
  }
}
