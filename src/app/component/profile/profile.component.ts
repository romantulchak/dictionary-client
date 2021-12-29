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
  public user: JwtDTO | null;

  constructor(private roleService: RoleService,
              private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserRoles();
  }

  private getUser(): void{
    this.user = this.tokenStorageService.getUser();
  }

  private getUserRoles(): void{
    if(this.user !== null){
      this.roleService.getRolesForUser(this.user?.id).subscribe(
        res=>{
            this.userPrivileges = this.getUserPrivileges(res);
        }
      )
    }
  }

  private getUserPrivileges(roles: string[]): UserPrivileges{
    return {
      isAdmin: roles.includes(RoleType[RoleType.ROLE_ADMIN]),
      isModerator: roles.includes(RoleType[RoleType.ROLE_MODERATOR]),
      isUser: roles.includes(RoleType[RoleType.ROLE_USER])
    } as UserPrivileges;
  }

}
