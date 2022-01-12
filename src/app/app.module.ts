import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MainComponent } from './component/main/main.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { CreateLanguageComponent } from './component/profile/languages/create-language/create-language.component';
import { UserInfoComponent } from './component/profile/user-info/user-info.component';
import {MatIconModule} from '@angular/material/icon';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LanguagesComponent } from './component/profile/languages/languages.component';
import {MatTableModule} from '@angular/material/table';
import { CreateWordComponent } from './component/profile/create-word/create-word.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { TopNavComponent } from './component/nav/top-nav/top-nav.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    MainComponent,
    CreateLanguageComponent,
    UserInfoComponent,
    NotFoundComponent,
    LanguagesComponent,
    CreateWordComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatFormFieldModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
