import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

	searchInput: string;

  constructor(public data: DataService, private router: Router) { }

  ngOnInit() {
  }

  searchMonsters() {
    this.router.navigate(['/list', {search: this.searchInput}]);
  }
}
