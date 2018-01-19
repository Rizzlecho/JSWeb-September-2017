import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {Router} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination/dist/ngx-pagination";


@Component({
  selector: 'bull-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string;
  public articles: any;
  public viewsArticles: any;
  public image: any;
  public counter = 0;
  public loader: boolean = true;

  constructor(private remoteService: RemoteService, private router: Router) {
  }

  ngOnInit() {
    //LIST ALL POSTS SECTION
    this.remoteService.listAllPosts().subscribe(data => {
        this.articles = data;
        this.loader = false;
      },
      err => {
        console.log(err.message);
      });


    // MOST VIEWED SECTION
    this.remoteService.listMostViewed().subscribe(data => {
        this.viewsArticles = data;
      },
      err => {
        console.log(err.message);
      });
  }

  // REDIRECT TO POST DETAILS
  details(e) {
    this.remoteService.postDetails(e).subscribe(data => {
        this.articles = data;
      },
      err => {
        console.log(err.message);
      });

  }

  countClicks(e) {
    this.counter++;
  }


  calcTime(dateIsoFormat) {

    let diff = +new Date() - (+new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }


}
