import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterConstant } from 'src/app/constants/router.constant';
import { RegistrationRequest } from 'src/app/request/registration.request';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public errorMessage: string;
  public isLoginFailed: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  private initRegistrationForm(): void{
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(90)]]
    });
  }

  public registration(): void{
    const registrationRequest = new RegistrationRequest(this.firstName, this.lastName, this.username, this.email, this.password);
    this.authService.registration(registrationRequest).subscribe(
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

  get firstName(): string{
    return this.registrationForm.get('firstName')?.value;
  }
  
  get lastName(): string{
    return this.registrationForm.get('lastName')?.value;
  }

  get username(): string{
    return this.registrationForm.get('username')?.value;
  }

  get email(): string{
    return this.registrationForm.get('email')?.value;
  }

  get password(): string{
    return this.registrationForm.get('password')?.value;
  }
}
