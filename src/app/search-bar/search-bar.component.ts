import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

	searchInput: string;
  firstSearch: boolean;

  constructor(public data: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
    if (!this.location.path()) { this.firstSearch = true; }
  }

  searchMonsters() {
    if (this.firstSearch) { this.firstSearch = false; }
    this.data.updateMonsterList(this.searchInput);
    this.router.navigate(['/list', {search: this.searchInput}]);
  }
}
