import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/dto/user.dto';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public user: UserDTO;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo(): void{
    this.userService.getUserInfo().subscribe(
      res=>{
        this.user = res;
      }
    );
  }
}
