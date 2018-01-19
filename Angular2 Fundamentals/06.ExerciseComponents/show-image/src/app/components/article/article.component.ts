import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article;
  counter: number = 1;
  limit: number = 0;
  hide = false;
  displayImage = false;

  constructor() {
  }

  ngOnInit() {



  }

  trunc(string) {
    return string.slice(0, (this.counter) * 250)
  }

  readMore() {
    if (this.article) {
      this.limit = Math.ceil(this.article.text.length / 250);
      this.limit-= 1;
    }
    console.log('Limit: ' + this.limit);
    console.log('Counter: ' + this.counter);

    if (this.limit === this.counter || this.limit===0) {
      this.hide = true;
    }

    this.counter = this.counter + 1;
  }

  hideText() {
    this.hide = false;
    this.counter = 0;
  }

  showImage() {
    this.displayImage = true;
  }

  hideImage() {
    this.displayImage = false;
  }

}
