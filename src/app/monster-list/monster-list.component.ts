import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
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
        ], {optional: true}),
        query(':leave', animate('50ms', style({opacity: 0})), {
          optional: true
        })
      ])
    ])
  ]
})
export class MonsterListComponent implements OnInit {

	currentMonsterList: Object[] = [];

  constructor(public data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.updateMonsterList();
  }

  updateMonsterList() {
  	this.data.getMonsterList().subscribe(data => {
  		let regex = new RegExp(this.route.snapshot.paramMap.get('search'));
	    let monsterList: Object[] = [];
  		for (let monster of data['results']) {
        if (regex.test(monster['name'].toLowerCase())) {
          monster.id = this.extractId(monster.url);
          monsterList.push(monster);
        }
      }
      this.currentMonsterList = monsterList;
  	})
  }

  extractId(url) {
    let regex = /\d/g;
    return url.match(regex).slice(1).join("");
  }

}
