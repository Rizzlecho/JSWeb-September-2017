import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route} from '@angular/router';
import {RemoteService} from "../remote/remote.service";


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private remoteService: RemoteService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let checker = !!localStorage.getItem('authtoken');
    if (checker) {
      return checker;
    }
    this.router.navigate(['/login']);
    return false
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (this.remoteService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }


}
