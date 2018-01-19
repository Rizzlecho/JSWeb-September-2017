import {Component, DoCheck, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination/dist/ngx-pagination";

@Component({
  selector: 'bull-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public title: string;
  public articles: any;
  public image: any;
  public counter = 0;
  public loader: boolean = true;
  public categoryFilter: any;

  constructor(private remoteService: RemoteService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let arr = [];
    this.categoryFilter = this.route.snapshot.paramMap.get('id');

    //LIST ALL POSTS FROM CATEGORY SECTION
    this.remoteService.listAllPostsFromCategory(this.categoryFilter).subscribe(data => {
        this.articles = data;
        this.loader = false;
      },
      err => {
        console.log(err.message);
      });

    // CHECK FOR INVALID URL
    this.remoteService.getCategories().subscribe((data) => {
        let currentCategory = this.router.url.substr(this.router.url.lastIndexOf('/') + 1, this.router.url.length);

        for (let obj in data) {
          arr.push(data[obj]['category']);
        }
        if (arr.indexOf(currentCategory) == -1) {
          this.router.navigate([`/**`]);
        }
      },
      err => {
        console.log(err.message);
      });


  }


  // REDIRECT TO GET POST DETAILS
  details(e) {
    this.remoteService.postDetails(e).subscribe(data => {
        this.articles = data;
        this.router.navigate([`/details/${e}`]);
      },
      err => {
        console.log(err.message);
      });

  }


  // TODO
  countClicks(e) {
    this.counter++;
  }


  calcTime(dateIsoFormat) {

    let diff = +new Date - (+new Date(dateIsoFormat));
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
