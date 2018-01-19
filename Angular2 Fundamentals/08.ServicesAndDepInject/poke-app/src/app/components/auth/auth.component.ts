import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  sub$;

  payload = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }


  collectAuthData(e) {
    this.payload[e.target.name] = e.target.value;
  }

  login() {
    this.sub$ = this.auth.authFunc(this.payload).subscribe(data => {
      console.log(data);
      sessionStorage.setItem('authtoken', data['authtoken']);
    });
  }
}
