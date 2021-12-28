import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { LoginRequest } from 'src/app/request/login.request';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string;
  public isLoginFailed: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login(): void{
    const loginRequest = new LoginRequest(this.username, this.password);
    this.authService.login(loginRequest).subscribe(
      res=>{
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveUser(res);
        this.router.navigateByUrl(RouterConstant.PROFILE_URL);
      },
      error=>{
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  get username(): string{
    return this.loginForm.get('username')?.value;
  }

  get password(): string{
    return this.loginForm.get('password')?.value;
  }

}
