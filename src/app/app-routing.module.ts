import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';
import { MainComponent } from './component/main/main.component';
import { CreateLanguageComponent } from './component/profile/create-language/create-language.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserInfoComponent } from './component/profile/user-info/user-info.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', canActivate: [AuthGuard], children:[
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent}
  ]},
  {path: 'profile', component:ProfileComponent, children:[
    {path: '', redirectTo: 'user-info', pathMatch: 'full'},
    {path: 'user-info', component: UserInfoComponent},
    {path: 'create-language', component: CreateLanguageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
