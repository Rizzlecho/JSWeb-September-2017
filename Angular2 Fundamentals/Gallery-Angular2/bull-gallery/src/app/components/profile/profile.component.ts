import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterLink} from '@angular/router';
import {RemoteService} from "../../services/remote/remote.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterModel} from "../../services/models/register.model";
import {ProfileModel} from "../../services/models/profile.model";

@Component({
  selector: 'bull-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public username: string;
  public avatar: string;
  public editProfile: FormGroup;
  public model: any;
  public id: string;

  constructor(public remoteService: RemoteService, private router: Router, private fb: FormBuilder,) {
    this.username = localStorage.getItem('username');
    this.model = new ProfileModel((localStorage.getItem('username')), 'user', '');
  }


  ngOnInit() {
    // GET USER DETAILS
    this.remoteService.getUserDetails().subscribe(data => {

        this.avatar = data[0]['avatar'];
        this.id = data[0]['_id']
      },
      err => {
        console.log(err.message);
      });

    this.editProfile = this.fb.group({
      newAvatar: ['']
    })
  }

  // UPDATE USER AVATAR
  update(e) {
    this.model.avatar = e.value.newAvatar;

    this.remoteService.editProfile(this.model, this.id).subscribe(data => {
        window.location.reload();
        this.router.navigate(['/']);
      },
      err => {
        console.log(err.message);
      })

  }


}
