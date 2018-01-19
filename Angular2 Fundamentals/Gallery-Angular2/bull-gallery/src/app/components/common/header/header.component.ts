import {Component, OnInit, DoCheck} from '@angular/core';
import * as $ from 'jquery';

import {Router, RouterModule, RouterLink} from '@angular/router';
import {RemoteService} from "../../../services/remote/remote.service";

@Component({
  selector: 'bull-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string;
  public avatar: string;
  public categoriesArr: any;
  public role: string;


  constructor(public remoteService: RemoteService, private router: Router) {
    this.username = localStorage.getItem('username');

  }


  ngOnInit() {
    this.dropdown();
    let arr = [];

    // GET USER DETAILS
    this.remoteService.getUserDetails().subscribe(data => {
        this.avatar = data[0]['avatar'];
        this.role = data[0]['role'];
      },
      err => {
        console.log(err.message);
      });

    // GET ALL CATEGORIES
    this.remoteService.getCategories().subscribe((data) => {
        for (let obj in data) {
          arr.push(data[obj]['category']);
        }

      },
      err => {
        console.log(err.message);
      });

    this.categoriesArr = arr;
  }



  // NAVIGATE TO CATEGORY URL
  clickCategory(categ) {
    this.remoteService.listAllPostsFromCategory(categ).subscribe(data => {

        this.router.navigate([`/category/${categ}`]);
        window.location.reload();
      },
      err => {
        console.log(err.message);
      });
     }

  private dropdown() {
    $('.dropdown').click(function (e) {
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });

    $('.mobile-dropdown').click(function (e) {
      e.preventDefault();
      $(this).next('.mobile-dropdown-content').slideToggle('fast');
    });


    $('#nav-icon4').click(function () {
      $(this).toggleClass('open');
      $('.mobile-menu').slideToggle();
    });
  }

  dropdown2(e) {
    e.preventDefault();
    $('.dropdown2').next('.dropdown-content2').slideToggle('fast');


  }


  loggedIn() {
    return !!localStorage.getItem('authtoken');
  }

  isAdmin() {
    if (this.role === 'admin') {
      return true
    }
    return false
  }

  logout() {
    this.remoteService.logout().subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/login']);
      // window.location.reload();
    });

  }
}
