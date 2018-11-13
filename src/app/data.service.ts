import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loading: boolean = false;
  currentMonsterList: Object[] = [];

  set monsterList(list) {
    this.currentMonsterList = list;
  }

  get monsterList() {
    return this.currentMonsterList;
  }

  fullMonsterList:any;

  constructor(private http: HttpClient) { }

  getMonsterList() {
    if (!this.fullMonsterList) {
      return this.http.get('./assets/data/monsters.json').pipe(
        map((data:Object[]) => {
          this.fullMonsterList = data;
          return this.fullMonsterList;
        })
      )
    } else {
      return of(this.fullMonsterList);
    }
  }

  getMonsterNames(list) {
    return list.map((monster) => {
      return { name: monster['name'], url: monster['url'] } 
    })
  }

  updateMonsterList(searchInput) {
    this.monsterList = [];
    this.loading = true;
    this.getMonsterList().subscribe(data => {
      let regex = new RegExp(searchInput.toLowerCase());
      let monsterList: Object[] = [];
      for (let monster of data) {
        if (regex.test(monster['name'].toLowerCase())) {
          monster['id'] = this.extractId(monster.url);
          monsterList.push(monster);
        }
      }
      this.monsterList = monsterList;
      this.loading = false;
    })
  }

  extractId(url) {
    let regex = /\d/g;
    return url.match(regex).slice(1).join("");
  }
}
