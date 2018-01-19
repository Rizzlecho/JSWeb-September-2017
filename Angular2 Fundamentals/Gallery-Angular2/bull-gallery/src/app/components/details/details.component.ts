import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CommentModel} from "../../services/models/comment.model";
import {FormsModule} from "@angular/forms";
import { Image, Action, ImageModalEvent, Description } from 'angular-modal-gallery';


@Component({
  selector: 'bull-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public title: string;
  public model: CommentModel;
  public article: any;
  public image: any;
  public counter = 0;
  public username: any;
  public comment: any;
  public role: any;
  public postId: any;
  public commentFail: boolean;
  public arr = [];

  constructor(private remoteService: RemoteService, private route: ActivatedRoute, private router: Router) {
    this.username = localStorage.getItem('username');
    this.model = new CommentModel(localStorage.getItem('username'), '', '')
  }


  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');


    // GET POST DETAILS
    this.remoteService.postDetails(this.postId).subscribe(data => {
        this.article = data;

      },
      err => {
        this.router.navigate([`/**`]);
      });

    // GET USER DETAILS
    this.remoteService.getUserDetails().subscribe(data => {
        this.role = data[0]['role'];
      },
      err => {
        console.log(err.message);
      });

    this.getAllComments();


  }

  // CREATE COMMENT SUBMIT
  submit() {
    this.model.username = this.username;
    this.model.postId = this.postId;

    this.remoteService.createComment(this.model).subscribe(data => {
        this.getAllComments();
        this.successfulComment();
        this.model.comment = '';

      },
      err => {
        console.log(err.message);
      })
  }

  successfulComment(): void {
    this.router.navigate([`/details/${this.postId}`]);
  }

  // GET ALL COMMENTS
  getAllComments() {

    this.remoteService.getAllComments(this.postId).subscribe(data => {
        this.arr = [];
        this.comment = data[0]['comment'];
        for (let obj in data) {
          this.arr.push(data[obj]);
        }
      },

      err => {
        console.log(err.message);
      });
  }

  // DELETE COMMENT
  deleteComment(id) {
    this.remoteService.deleteComment(id).subscribe(data => {
        this.router.navigate([`/details/${this.postId}`]);
        this.getAllComments();
      },
      err => {
        console.log(err.message);
      });
  }


  // DELETE POST
  deletePost() {
    const id = this.route.snapshot.paramMap.get('id');

    this.remoteService.deletePost(id).subscribe(data => {
        this.article = data;
        this.router.navigate(['/'])
      },
      err => {
        console.log(err.message);
      });
  }

  // NAVIGATE TO EDIT PAGE OF CLICKED POST
  editPostNavigate() {
    this.router.navigate(['/edit/' + this.route.snapshot.paramMap.get('id')])
  }


  isAdmin() {
    if (this.role === 'admin') {
      return true
    }
    return false
  }

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
