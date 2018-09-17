import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMonsterList() {
  	return this.http.get('http://www.dnd5eapi.co/api/monsters/');
  }

  getMonsterDetails(id) {
    return this.http.get(`http://www.dnd5eapi.co/api/monsters/${id}`);
  }

}
