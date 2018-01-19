import {Component, OnInit} from '@angular/core';
import { seed } from '../seed'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data;
  selectedArticle: Object;
  ngOnInit(){
    this.data = seed;
  }

  showDetails(targetId){
    this.selectedArticle = this.data.find(x=> x.id == targetId);
  }
}
