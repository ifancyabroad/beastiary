import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monster-details',
  templateUrl: './monster-details.component.html',
  styleUrls: ['./monster-details.component.scss']
})
export class MonsterDetailsComponent implements OnInit {

	monster: Object;

  constructor(private data: DataService, private route: ActivatedRoute) {
  	this.route.params.subscribe( params => this.monster = params.id )
  }

  ngOnInit() {
  	this.data.getMonsterDetails(this.monster).subscribe(
  		data => this.monster = data
  	)
  }

  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

}
