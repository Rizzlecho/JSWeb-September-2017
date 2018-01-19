import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route} from '@angular/router';
import {RemoteService} from "../remote/remote.service";


@Injectable()
export class AdminGuard implements CanActivate {
  public role: string;

  constructor(private remoteService: RemoteService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // CHECK ROLE
    this.remoteService.getUserDetails().subscribe(data => {
        this.role = data[0]['role'];
      },
      err => {
        console.log(err.message);
      });

    if(this.role === 'admin'){
      return true
    }
    this.router.navigate(['/']);
    return false
  }


}
