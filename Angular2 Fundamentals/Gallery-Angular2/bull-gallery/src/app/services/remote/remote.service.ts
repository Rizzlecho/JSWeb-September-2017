import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {RegisterModel} from '../models/register.model';
import {LoginModel} from '../models/login.model';
import {UploadModel} from "../models/upload.model";
import {ProfileModel} from "../models/profile.model";
import {CategoryModel} from "../models/category.model";
import {CommentModel} from "../models/comment.model";


const appKey = "kid_ByvP9HaWG"; // APP KEY HERE;
const appSecret = "14baeedc0c084857bedcbe3ec8bbbf8d"; // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const postsUrl = `https://baas.kinvey.com/appdata/${appKey}/posts`;
const listAllPostUrl = `https://baas.kinvey.com/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`;
const listMostViewedUrl = `https://baas.kinvey.com/appdata/${appKey}/posts?query={}&sort={"counter": -1}&limit=6`;
const postDetailsUrl = `https://baas.kinvey.com/appdata/${appKey}/posts/`;
const userDetails = `https://baas.kinvey.com/user/${appKey}?query={"username":"${localStorage.getItem('username')}"}`;
const categoriesCollectionUrl = `https://baas.kinvey.com/appdata/${appKey}/categories`;
const getPostsByCategory = `https://baas.kinvey.com/appdata/${appKey}/posts`;
const postCommentUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;
const getAllCommentsUrl = `https://baas.kinvey.com/appdata/${appKey}/comments?query=`;



@Injectable()
export class RemoteService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel: RegisterModel): Observable<Object> {
    return this.http.post(
      registerUrl,
      JSON.stringify(registerModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  loggedIn() {
    return !!localStorage.getItem('authtoken');
  }


  upload(uploadModel: UploadModel) {
    return this.http.post(
      postsUrl,
      JSON.stringify(uploadModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  listAllPosts() {
    return this.http.get(
      listAllPostUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  listAllPostsFromCategory(categoryFilter) {
    return this.http.get(
      getPostsByCategory + `?query={"category":"${categoryFilter}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  };

  listMostViewed() {
    return this.http.get(
      listMostViewedUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }


  postDetails(postId) {
    return this.http.get(
      postDetailsUrl + postId,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  deletePost(postId) {
    return this.http.delete(
      postDetailsUrl + postId,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  editPost(uploadModel: UploadModel, postId) {
    return this.http.put(
      postDetailsUrl + postId,
      JSON.stringify(uploadModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createComment(commentModel: CommentModel){
    return this.http.post(
      postCommentUrl,
      JSON.stringify(commentModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getAllComments(postId){
    return this.http.get(
      getAllCommentsUrl + `{"postId":"${postId}"}&sort={"_kmd.ect": -1}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  };

  deleteComment(commentId){
    return this.http.delete(
      postCommentUrl + '/' +commentId,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }


  getUserDetails() {
    return this.http.get(
      userDetails,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  editProfile(profileModel: ProfileModel, id): Observable<Object> {
    return this.http.put(
      registerUrl + '/' + id,
      JSON.stringify(profileModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  getCategories() {
    return this.http.get(
      categoriesCollectionUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  createCategory(categoryModel: CategoryModel): Observable<Object> {
    return this.http.post(
      categoriesCollectionUrl,
      JSON.stringify(categoryModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  deleteCategory(categoryName) {
    return this.http.delete(
      categoriesCollectionUrl + `/?query={"category":"${categoryName}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }


  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    }
    else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}

