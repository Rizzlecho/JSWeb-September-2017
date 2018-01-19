import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  @Input() incomingArticle;
  @Output() selection: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendData(targetId) {
    this.selection.emit(targetId)

  }

}
