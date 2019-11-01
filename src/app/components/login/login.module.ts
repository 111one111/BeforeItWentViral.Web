import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { AuthCallsService } from 'src/app/services/auth-calls.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidatorComponent } from './validator/validator.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      SharedModule
    ],
    declarations: [
      LoginComponent,
      RegisterComponent,
      ValidatorComponent,
      LostPasswordComponent,
      ResetPasswordComponent,
      TermsOfServiceComponent,

      ],
    exports: [
      FormsModule,
      LoginComponent,
      RegisterComponent,
      ValidatorComponent,
      LostPasswordComponent,
      ResetPasswordComponent,
      TermsOfServiceComponent,

    ],
    providers: [
        AuthCallsService
    ]
  })
  export class LoginModule { }
