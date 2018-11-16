import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes, state } from '@angular/animations';
import { faSearch, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('toggleNav', [
      state('show', style({transform: 'translateY(0)'})),
      state('hide', style({transform: 'translateY(-100%)'})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-out'))
    ]),
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [     
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class SearchBarComponent implements OnInit {

  fullMonsterList: Object[] = [];
  currentMonsterList: Object[] = [];

  selectedMonster: number = -1;

  showList: boolean = true;

	searchInput: string;
  firstSearch: boolean;

  faSearch = faSearch;
  faDiceD20 = faDiceD20;

  constructor(public data: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
    if (!this.location.path()) { this.firstSearch = true; }
    this.data.getMonsterList().subscribe(data => {
      let monsterNames = this.data.getMonsterNames(data);
      for (let monster of monsterNames) {
        monster['id'] = this.data.extractId(monster.url);
        this.fullMonsterList.push(monster);
      }
    });
  }

  resetForm() {
    this.searchInput = '';
    this.showList = false;
  }

  setFirstSearch() {
    this.firstSearch = true;
  }

  setInput(name) {
    this.searchInput = name;
    this.showList = false;
  }

  stopSubmit(e) {
    if (e.keyCode === 13 && this.selectedMonster > -1) {
      e.preventDefault();
    }
  }

  filterMonsters() {
    this.currentMonsterList = this.fullMonsterList.filter((monster) => {
      let regex = new RegExp(this.searchInput.toLowerCase());
      return regex.test(monster['name'].toLowerCase());
    });
    this.showList = true;
  }

  selectMonster(e) {
    if (this.currentMonsterList) {
      switch (e.keyCode) {
        case 13:
          this.setInput(this.currentMonsterList[this.selectedMonster]['name']);
          break;
        case 38:
          this.selectedMonster--;
          break;
        case 40:
          this.selectedMonster++;
          break;
      }
    }
  }

  searchMonsters() {
    if (this.firstSearch) { this.firstSearch = false; }
    this.filterMonsters();
    if (this.currentMonsterList.length > 1) {
      this.data.updateMonsterList(this.searchInput);
      this.router.navigate(['/list', {search: this.searchInput}]);
    } else {
      this.router.navigate([`/details/${this.currentMonsterList[0]['id']}`]);      
    }
    this.resetForm();
  }

  searchRandomMonster() {
    if (this.firstSearch) { this.firstSearch = false; }
    let max: number;
    this.data.getMonsterList().subscribe(data => {
      max = data.length;
      let monsterId = Math.floor(Math.random() * (max - 1) + 1);
      this.router.navigate([`/details/${monsterId}`]);
    })
  }
}
