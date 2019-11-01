import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { ValidatorComponent } from './components/login/validator/validator.component';
import { LostPasswordComponent } from './components/login/lost-password/lost-password.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { ContentDisplayComponent } from './components/landing/content-display/content-display.component';
import { ViewPageComponent } from './components/landing/view-page/view-page.component';
import { PageManagementComponent } from './components/page-management/page-management.component';


const routes: Routes = [
  { path: '', component: ContentDisplayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'validator/:validator/:userId', component: ValidatorComponent },
  { path: 'login/lostpassword', component: LostPasswordComponent },
  { path: 'login/passwordreset/:lostpasswordcode/:accessId', component: ResetPasswordComponent },
  { path: 'viewpage/:pageId', component: ViewPageComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
