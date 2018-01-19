import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {PokeSearchService} from '../../services/poke-search/poke-search.service';


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit, OnDestroy {
  sub$;
  pokeData;

  targetName = new Subject<any>();




  constructor(private pokeSearch: PokeSearchService) {
    this.pokeSearch.debouncePokemons(this.targetName).subscribe(e => {
      console.log(e);
      this.pokeData = e;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  pokemonSearchRequest(e) {
    this.targetName.next(e.target.value);
  }
}
