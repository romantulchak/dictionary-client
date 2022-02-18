import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/model/enum/role-type.enum';
import { UserPrivileges } from 'src/app/model/user-privileges.model';
import { RoleService } from 'src/app/service/role.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userPrivileges: UserPrivileges;
  public isAllowAllRoles: boolean;

  constructor(private roleService: RoleService,
              private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.getUserRoles();
  }

  private getUserRoles(): void{
    let roles = this.tokenStorageService.getRoles();
    if(roles.length === 0){
      this.roleService.getRolesForUser().subscribe(
        res=>{
            this.userPrivileges = this.getUserPrivileges(res);
            this.isAllowAllRoles = this.userPrivileges.allowAllRoles();
            this.tokenStorageService.saveRoles(res);
        }
      );
    }else {
      this.userPrivileges = this.getUserPrivileges(roles);
      this.isAllowAllRoles = this.userPrivileges.allowAllRoles();
    }
  }

  private getUserPrivileges(roles: string[]): UserPrivileges{
    const isAdmin = roles.includes(RoleType[RoleType.ROLE_ADMIN]);
    const isModerator = roles.includes(RoleType[RoleType.ROLE_MODERATOR]);
    const isUser = roles.includes(RoleType[RoleType.ROLE_USER]);
    return new UserPrivileges(isAdmin, isModerator, isUser);
  }
}
