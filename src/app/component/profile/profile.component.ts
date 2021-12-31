import { Component, OnInit } from '@angular/core';
import { JwtDTO } from 'src/app/dto/jwt.dto';
import { RoleDTO } from 'src/app/dto/role.dto';
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

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.getUserRoles();
  }

  private getUserRoles(): void{
    this.roleService.getRolesForUser().subscribe(
      res=>{
          this.userPrivileges = this.getUserPrivileges(res);
          this.isAllowAllRoles = this.userPrivileges.allowAllRoles();
      }
    );
  }

  private getUserPrivileges(roles: string[]): UserPrivileges{
    const isAdmin = roles.includes(RoleType[RoleType.ROLE_ADMIN]);
    const isModerator = roles.includes(RoleType[RoleType.ROLE_MODERATOR]);
    const isUser = roles.includes(RoleType[RoleType.ROLE_USER]);
    return new UserPrivileges(isAdmin, isModerator, isUser);
  }


}
