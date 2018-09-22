import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', 
        [
          style({opacity: 0, transform: 'translateY(-15px)'}),
          stagger('50ms', animate('550ms ease-out', style({opacity: 1, transform: 'translateY(0px)'})))
        ], {optional: true})
      ])
    ])
  ]
})
export class MonsterListComponent implements OnInit {

	currentMonsterList() {
		return this.data.monsterList;
	}

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
