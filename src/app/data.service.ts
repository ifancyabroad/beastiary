import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentMonsterList: Object[] = [];

  set monsterList(list) {
    this.currentMonsterList = list;
  }

  get monsterList() {
    return this.currentMonsterList;
  }

  constructor(private http: HttpClient) { }

  getMonsterList() {
  	return this.http.get('http://www.dnd5eapi.co/api/monsters/');
  }

  updateMonsterList(searchInput) {
    this.monsterList = [];
    this.getMonsterList().subscribe(data => {
      let regex = new RegExp(searchInput);
      let monsterList: Object[] = [];
      for (let monster of data['results']) {
        if (regex.test(monster['name'].toLowerCase())) {
          monster.id = this.extractId(monster.url);
          monsterList.push(monster);
        }
      }
      this.monsterList = monsterList;
    })
  }

  extractId(url) {
    let regex = /\d/g;
    return url.match(regex).slice(1).join("");
  }

  getMonsterDetails(id) {
    return this.http.get(`http://www.dnd5eapi.co/api/monsters/${id}`);
  }

}
