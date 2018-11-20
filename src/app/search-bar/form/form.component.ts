import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faSearch, faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('searchForm') searchForm: NgForm;
  @Input() firstSearch: boolean;
  @Output() toggleSearch: EventEmitter<any> = new EventEmitter();

  fullMonsterList: Object[] = [];
  currentMonsterList: Object[] = [];

  selectedMonster = -1;

  showList = true;

  searchInput: string;

  faSearch = faSearch;
  faDiceD20 = faDiceD20;

  constructor(public data: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.data.getMonsterList().subscribe(data => {
      const monsterNames = this.data.getMonsterNames(data);
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

  setInput(name) {
    this.searchInput = name;
    this.showList = false;
  }

  toggleFirstSearch() {
    if (this.firstSearch) {
      this.firstSearch = false;
      this.toggleSearch.emit(false);
    }
  }

  stopSubmit(e) {
    if (e.keyCode === 13 && this.selectedMonster > -1) {
      e.preventDefault();
    }
  }

  filterMonsters() {
    if (this.searchInput) {
      this.currentMonsterList = this.fullMonsterList.filter((monster) => {
        const regex = new RegExp(this.searchInput.toLowerCase());
        return regex.test(monster['name'].toLowerCase());
      });
      this.showList = true;
    }
  }

  selectMonster(e) {
    if (this.currentMonsterList) {
      switch (e.keyCode) {
        case 13:
          if (this.selectedMonster > -1) {
            this.setInput(this.currentMonsterList[this.selectedMonster]['name']);
            this.selectedMonster = -1;
          }
          break;
        case 38:
          if (this.selectedMonster > 0) { this.selectedMonster--; }
          break;
        case 40:
          if (this.currentMonsterList.length > this.selectedMonster + 1) { this.selectedMonster++; }
          break;
      }
    }
  }

  searchMonsters() {
    this.toggleFirstSearch();
    this.filterMonsters();
    if (this.currentMonsterList.length !== 1) {
      this.data.updateMonsterList(this.searchInput);
      this.router.navigate(['/list', { search: this.searchInput }]);
    } else {
      this.router.navigate([`/details/${this.currentMonsterList[0]['id']}`]);
    }
    this.resetForm();
  }

  searchRandomMonster() {
    this.toggleFirstSearch();
    this.data.getMonsterList().subscribe(data => {
      let max = data.length;
      let monsterId = Math.floor(Math.random() * (max - 1) + 1);
      this.router.navigate([`/details/${monsterId}`]);
    });
  }
}
