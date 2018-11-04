import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { trigger,style,transition,animate,keyframes,state } from '@angular/animations';

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('* <=> *', [     
        style({opacity: 0, transform: 'translateX(25px)'}),
        animate('800ms ease-out')
      ])
    ])
  ]
})

export class MonsterDetailsComponent implements OnInit {

	monster: Object;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (!this.monster) {
      this.route.params.subscribe( params => this.monster = params.id )
      this.data.getMonsterDetails(this.monster).subscribe(data => this.monster = data);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route.params.subscribe( params => this.monster = params.id )
        this.data.getMonsterDetails(this.monster).subscribe(data => this.monster = data);
      }
    })
  }

  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

}
