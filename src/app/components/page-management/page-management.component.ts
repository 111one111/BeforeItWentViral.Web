import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlotInformation } from 'src/app/interfaces/slot-Information.interface';
import { select } from '@angular-redux/store';
import { RestService } from 'src/app/services/rest.service';
import { UrlHelper, urlActions } from 'src/app/helpers/url-helper';



@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.css']
})
export class PageManagementComponent implements OnInit {

  pages: SlotInformation[] = [];
  userId: number;
  @select(['loggedInUser']) storedUser;

  constructor(private restService: RestService, private urlHelper: UrlHelper, private router: Router) { }

  ngOnInit() {
    this.storedUser.subscribe(auth => {
      this.userId = auth.id;
      this.getPageList();
    });
  }

  /**
   * Retrieves users pages.
   */
  getPageList() {
    this.restService.authGetRequest(this.urlHelper.transformUrl([this.userId.toString()], urlActions.getUsersPages))
    .subscribe(result => {
      if (result.success) {
        this.pages = result.data;
      }
    });
  }

  /**
   * redirects to the edit page
   * @param page required for page id.
   */
  editPage(page: SlotInformation) {
    this.router.navigate(['pagemanagment/editpage/' + page.pageId]);
  }

  /**
   * Sets flag to true causing advert to show.
   * @param page Related display slot
   */
  enablePage(page: SlotInformation) {
    const data = { pageDisplaySlotId: page.pageDisplaySlotId, userId: this.userId, isActive: true };
    this.restService.authPutRequest(urlActions.updateSlotStatus, data)
    .subscribe(result => {
      this.getPageList();
    });
  }

  /**
   * Sets flag to false causing advert to hide from being advertised.
   * @param page Related display slot
   */
  disablePage(page: SlotInformation) {
    const data = { pageDisplaySlotId: page.pageDisplaySlotId, userId: this.userId, isActive: false };
    this.restService.authPutRequest(urlActions.updateSlotStatus, data)
    .subscribe(result => {
      this.getPageList();
    });
  }
}
