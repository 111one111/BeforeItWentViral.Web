import { Component, OnInit, DebugEventListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthCallsService } from 'src/app/services/auth-calls.service';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';
import { Login } from 'src/app/interfaces/login-user.interface';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { ToastrService } from 'ngx-toastr';
import { LOGIN } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private authCallsService: AuthCallsService,
              private router: Router, private ngRedux: NgRedux<IAppState>, private toastr: ToastrService) {
    this.loginGroup = fb.group({
    loginUserName: new FormControl('', Validators.required),
    loginPassword: new FormControl('', Validators.required)
  });
}

  ngOnInit() {
  }

  /**
   * Checks the db for the username and password receives the token and saves the token.
   */
  login(): void {
    if (this.loginGroup.valid) {
      this.loading = true;
      const loginData: Login = {
        userName: this.loginGroup.get('loginUserName').value,
        password: this.loginGroup.get('loginPassword').value,
        rememberMe: false
      };

      this.authCallsService.loginUser(loginData).subscribe(result => {
        if (result.success) {
          this.loading = false;
          const authData: AuthResponse = JSON.parse(result.data);
          this.authCallsService.saveAuthToken(authData);
          this.toastr.success(result.message, 'Success');
          this.ngRedux.dispatch({ type: LOGIN, data: authData });
          this.router.navigate(['/welcome']);
        } else {
          this.toastr.error(result.message, 'Failed');
        }
      }, (servError => {
        this.loading = false;
        if (servError.message) {
          servError.message = 'There was an issue communicating with the server.  Please try again later.';
        }
        this.toastr.error(servError.message, 'Failed');
      }));
    }
  }
}
