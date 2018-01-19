import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryModel} from "../../services/models/category.model";

@Component({
  selector: 'bull-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public username: string;
  public categoriesArr: any;
  public createNewCategory: FormGroup;
  public model: CategoryModel;
  public category;

  constructor(private remoteService: RemoteService,  private fb: FormBuilder, private router: Router) {
    this.username = localStorage.getItem('username');
    this.model = new CategoryModel('');
  }


  ngOnInit() {
    this.createNewCategory = this.fb.group({
      category: [''],
    });

    let arr = [];

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


  // CREATE CATEGORY POST
  createCategory(){
    this.model = this.createNewCategory.value;
    this.remoteService.createCategory(this.model).subscribe(data =>{
        window.location.reload();
        this.router.navigate(['/']);
      },
      err => {
        console.log(err.message);
      })
  }

  // GET CATEGORY FROM OPTION
  onChange(category){
    this.category = category;
  }


  // DELETE CATEGORY
  deleteCategory(){
    this.remoteService.deleteCategory(this.category).subscribe((data) => {
        window.location.reload();
        this.router.navigate(['/']);
      },
      err => {
        console.log(err.message);
      });

  }


}
