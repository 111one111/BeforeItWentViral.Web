import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { urlActions } from 'src/app/helpers/url-helper';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})

export class LostPasswordComponent implements OnInit {

  lostPasswordGroup: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private restService: RestService,
              private toastr: ToastrService,
              private router: Router) {
    this.lostPasswordGroup = fb.group({
      loginEmail: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  recoverPassword() {
    if (this.lostPasswordGroup.valid) {
      const userDetails: User = {
        email: this.lostPasswordGroup.get('loginEmail').value,
        firstName: '',
        lastName: '',
        password: '',
        businessName: '',
        userName: '',
        accountType: '',
        country: 0
      };

      this.restService.postRequest(urlActions.userLostPassword, userDetails).subscribe(result => {
        this.loading = true;
        if (result.success) {
          this.toastr.success(result.message, 'Success');
          this.loading = false;
          this.router.navigate(['']);
        } else {
          this.loading = false;
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
