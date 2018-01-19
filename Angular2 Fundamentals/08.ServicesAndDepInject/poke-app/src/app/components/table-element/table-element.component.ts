import {Component, Input, OnInit} from '@angular/core';
import {FocusService} from '../../services/focus/focus.service' ;


@Component({
  selector: 'app-table-element',
  templateUrl: './table-element.component.html',
  styleUrls: ['./table-element.component.scss']
})
export class TableElementComponent implements OnInit {

  @Input() pokemon;

  constructor(private focus: FocusService) {
  }

  ngOnInit() {
  }

  select(data) {
    let id = data.id;
    console.log(data);

    this.focus.elevatePokemonData(id);
  }
}
