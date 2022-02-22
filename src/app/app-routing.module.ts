import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';
import { MainComponent } from './component/main/main.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CreateWordComponent } from './component/profile/create-word/create-word.component';
import { CreateLanguageComponent } from './component/profile/languages/create-language/create-language.component';
import { LanguagesComponent } from './component/profile/languages/languages.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserInfoComponent } from './component/profile/user-info/user-info.component';
import { AllWordsComponent } from './component/profile/words/all-words/all-words.component';
import { MyWordsComponent } from './component/profile/words/my-words/my-words.component';
import { WordsComponent } from './component/profile/words/words.component';
import { RouterConstant } from './constants/router.constant';
import { AdminModeratorGuard } from './guard/admin-moderator.guard';
import { AuthGuard } from './guard/auth.guard';
import { LanguageQueryParamGuard } from './guard/language-query-param.guard';

const routes: Routes = [
  {path: RouterConstant.HOME_URL, component: MainComponent},
  {path: RouterConstant.AUTH_URL, canActivate: [AuthGuard], children:[
    {path: RouterConstant.LOGIN_URL, component: LoginComponent},
    {path: RouterConstant.REGISTRATION_URL, component: RegistrationComponent}
  ]},
  {path: RouterConstant.PROFILE_URL, component:ProfileComponent, children:[
    {path: RouterConstant.HOME_URL, redirectTo: RouterConstant.USER_INFO_URL, pathMatch: 'full'},
    {path: RouterConstant.USER_INFO_URL, component: UserInfoComponent},
    {path: RouterConstant.LANGUAGES_URL, component: LanguagesComponent, canActivate: [LanguageQueryParamGuard]},
    {path: RouterConstant.CREATE_WORD_URL, component: CreateWordComponent},
    {path: RouterConstant.CREATE_LANGUAGE_URL, component: CreateLanguageComponent, canActivate: [AdminModeratorGuard], data: {roles: ['ROLE_MODERATOR', 'ROLE_ADMIN']}},
    {path: RouterConstant.WORDS_URL, component: WordsComponent, children:[
      {path: RouterConstant.HOME_URL, redirectTo: RouterConstant.MY_WORDS_URL, pathMatch: 'full'},
      {path: RouterConstant.MY_WORDS_URL, component: MyWordsComponent},
      {path: RouterConstant.ALL_WORDS_URL, component: AllWordsComponent}
    ]}
  ]},
  {path: RouterConstant.NOT_FOUND_URL, component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
