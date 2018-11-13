import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { trigger,style,transition,animate,keyframes,state } from '@angular/animations';

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0, transform: 'translateX(25px)'})),
      state('out', style({opacity: 0, transform: 'translateX(25px)'})),
      transition('* <=> in', [     
        animate('800ms ease-out')
      ])
    ])
  ]
})

export class MonsterDetailsComponent implements OnInit {

	monster: Object;
  monsterId: string;
  state: string = 'out';

  constructor(private data: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getMonster();
  }

  toggleState() {
    this.state === 'in' ? this.state = 'out' : this.state = 'in'; 
  }

  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  getMonster() {
    this.route.params.subscribe( params => {
      this.monsterId = params.id;
      this.data.getMonsterList().subscribe(data => {
        let newMonster = data[this.monsterId]
        if (!this.monster) {
          this.monster = newMonster;
          this.toggleState();
        } else {
          this.toggleState();
          setTimeout(() => {
            this.monster = newMonster;
            this.toggleState();            
          }, 800)
        }
      })
    })
  }

}
