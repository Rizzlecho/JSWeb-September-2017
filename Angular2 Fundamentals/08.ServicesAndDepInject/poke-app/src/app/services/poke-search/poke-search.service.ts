import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import {Observable} from 'rxjs/Observable';

const baseUrl = 'http://localhost:5000';

@Injectable()
export class PokeSearchService {

  constructor(private http: HttpClient) {
  }

  debouncePokemons(e) {
   return e.debounceTime(400).distinctUntilChanged()
      .switchMap(x => this.getPokemons(x));
  }

  getPokemons(payload) {
    return this.http.get(baseUrl + `/pokedex?pokename=${payload}`);
  }
}
