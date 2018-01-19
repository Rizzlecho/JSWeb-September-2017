import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {RemoteService} from '../../services/remote/remote.service'
import {UploadModel} from "../../services/models/upload.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bull-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  public editPostGroup: FormGroup;
  public model: UploadModel;
  public uploadFail: boolean;
  public titleFail: boolean;
  public imageFail: boolean;
  public categoryFail: boolean;
  public descriptionFail: boolean;
  public validCategory: boolean = false;
  public ifNotValid: boolean;
  public category: any;
  public categoriesArr: any;
  public article: any;
  public id: any;

  constructor(private router: Router, private fb: FormBuilder, private remoteService: RemoteService, private route: ActivatedRoute) {
    this.model = new UploadModel('', '', '', '', localStorage.getItem('username'), 0);
  }

  ngOnInit() {
    let arr = [];

    this.id = this.route.snapshot.paramMap.get('id');

    this.editPostGroup = this.fb.group({
      title: [''],
      image: [''],
      category: [''],
      description: ['']
    });


    // GET POST DETAILS
    this.remoteService.postDetails(this.id).subscribe(data => {
        this.article = data;

        this.editPostGroup = this.fb.group({
          title: [data['title']],
          image: [data['image']],
          category: [data['category']],
          description: [data['description']]
        });
      },
      err => {
        console.log(err.message);
      });


    // GET ALL CATEGORIES FROM COLLECTION
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

  onChange(category) {
    this.category = category;

  }


  // TO SAVE CHANGES FROM EDIT POST
  submit() {
    this.model.title = this.editPostGroup.value['title'];
    this.model.image = this.editPostGroup.value['image'];
    this.model.category = this.category;
    this.model.description = this.editPostGroup.value['description'];


    //NOTIFICATIONS
    if (this.model.title === '') {
      this.titleFail = true;
      return
    }
    else if (this.model.image === '') {
      this.titleFail = false;
      this.imageFail = true;
      return
    }
    else if (this.category === '' || this.category === null || this.category === undefined) {
      this.imageFail = false;
      this.categoryFail = true;
      return
    }
    else if (this.model.description === '') {
      this.categoryFail = false;
      this.descriptionFail = true;
      return
    }


    // IF USER TRIES MANUALLY TO ADD CATEGORY FROM HTML
    this.categoriesArr.map(data => {
      if (data == this.model.category) {
        this.validCategory = true;
      }
    });

    if (!this.validCategory) {
      this.ifNotValid = true;
      return
    }
    /////////////////////////////


    // PUT EDIT POST
    this.remoteService.editPost(this.model, this.id).subscribe(data => {

        this.successfulEditPost();
      },
      err => {
        console.log(err.message);
        this.uploadFail = true;
      })
  }

  successfulEditPost(): void {
    this.categoriesArr.push(this.category);

    this.uploadFail = false;
    this.router.navigate(['/']);
  }


}
