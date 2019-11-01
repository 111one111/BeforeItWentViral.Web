import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { AuthCallsService } from 'src/app/services/auth-calls.service';
import { UrlHelper, urlPaths } from 'src/app/helpers/url-helper';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  isCollapsed = true;
  userLoggedIn;
  searchValue;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router, private authService: AuthCallsService,
              private urlHelper: UrlHelper, private modalService: NgbModal) {
    this.authService.getAuthToken();
    this.ngRedux.select('loggedIn')
    .subscribe(login => {
      this.userLoggedIn = login;
    });
  }

  /**
   * Navbar function
   */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Takes user to logout page
   */
  logout() {
    this.userLoggedIn = false;
    this.router.navigate(['/logout']);
  }

  search() {
    this.router.navigate([this.urlHelper.transformUrl([this.searchValue], urlPaths.searchPage)]);
  }

  updateSearch(event) {
    this.searchValue = event;
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

  ngOnInit() {
  }
}
