import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private auth: ApiService, private router: Router) { }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }
}
