import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../service/role.service';

@Injectable({
  providedIn: 'root'
})
export class AdminModeratorGuard implements CanActivate {


  constructor(private roleService: RoleService,
              private rotuer: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data.roles as Array<string>;
    return this.getUserPrivileges(roles);
  }

  private getUserPrivileges(roles: string[]): Observable<boolean>{
    return new Observable<boolean>(value => {
      this.roleService.getRolesForUser().subscribe(
        res=>{
          const isInRole = res.some(role => roles.includes(role));
          if(isInRole){
            value.next(true);
          }else{
            this.rotuer.navigateByUrl('/not-found');
            value.next(false);
          }
        }
      );
    })
  }
  
}
