import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DictionaryKeyValue } from 'src/app/interfaces/dictionary-key-value.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { urlActions } from 'src/app/helpers/url-helper';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerGroup: FormGroup;
  countryList: DictionaryKeyValue[];
  errors: DictionaryKeyValue[];
  loading = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private restService: RestService,
              private modalService: NgbModal) {
    this.registerGroup = this.fb.group({
      registerUserName: new FormControl('', Validators.required),
      registerFirstName: new FormControl('', Validators.required),
      registerLastName: new FormControl('', Validators.required),
      registerBusinessName: new FormControl(''),
      registerCountry: new FormControl(''),
      registerEmail: new FormControl('', Validators.required),
      registerPassword: new FormControl('', Validators.required),
      registerConfirmPassword: new FormControl('', Validators.required),
      registerTerms: new FormControl('', Validators.requiredTrue),
      registerMemberType: new FormControl('Member')
    });
  }

  ngOnInit() {
    this.restService.getRequest(urlActions.countryList).subscribe(newCountryList => {
      this.countryList = newCountryList.data;
    });
  }

  /**
   * Registers the User.
   */
  registerUser() {
    if (this.registerGroup.valid) {
      const user: User = {
        userName: this.registerGroup.get('registerUserName').value,
        firstName: this.registerGroup.get('registerFirstName').value,
        lastName: this.registerGroup.get('registerLastName').value,
        businessName: this.registerGroup.get('registerBusinessName').value,
        country: this.registerGroup.get('registerCountry').value,
        email: this.registerGroup.get('registerEmail').value,
        password: this.registerGroup.get('registerPassword').value,
        accountType: this.registerGroup.get('registerMemberType').value
      };

      this.restService.postRequest(urlActions.registerUser, user).subscribe(result => {
        this.loading = true;
        if (result.success) {
          this.loading = false;
          this.toastr.success(result.message, 'Success');
          this.router.navigate(['']);

        } else {
          this.loading = false;
          this.toastr.error(result.message, 'Failed');
          this.errors = result.data;
        }
      }, (serveError => {
        this.loading = false;
        if (serveError.message) {
          serveError.message = 'There was an issue communicating with the server.  Please try again later.';
        }
        this.toastr.error(serveError.message, 'Failed');
      }));
    } else {
      this.registerGroup.markAllAsTouched();
    }
  }

  /**
   * Shows the terms and conditions.
   */
  openTermsOfService(termsmodal): void {
    const options: NgbModalOptions = {
      size: 'lg',
      backdrop: 'static'
    };
    this.modalService.open(termsmodal, options);
  }
}
