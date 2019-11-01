import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';
import { ReclaimPassword } from 'src/app/interfaces/reclaim-password.interface';
import { urlActions } from 'src/app/helpers/url-helper';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  lostPassword: ReclaimPassword;
  reclaimPasswordGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private restService: RestService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
         this.reclaimPasswordGroup = fb.group({
           reclaimPassword: new FormControl('', Validators.required),
           reclaimPasswordConfirmation: new FormControl('', Validators.required)
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.lostPassword = { accessId: +params.get('accessId'), lostPasswordCode: params.get('lostpasswordcode'), password: ''};
    });
  }

  resetPassword() {
    this.lostPassword.password = this.reclaimPasswordGroup.get('reclaimPassword').value;
    this.restService.postRequest(urlActions.userResetPassword, this.lostPassword).subscribe(result => {
      if (result.success) {
        this.toastr.success(result.message, 'Success');
        this.router.navigate(['login']);
      } else {
        this.toastr.error(result.message, 'Failed');
      }
    });
  }
}
