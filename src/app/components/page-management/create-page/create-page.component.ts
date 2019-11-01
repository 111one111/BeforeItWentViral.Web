import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryKeyValue } from 'src/app/interfaces/dictionary-key-value.interface';
import { select } from '@angular-redux/store';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';
import { Page } from 'src/app/interfaces/page.interface';
import { urlActions } from 'src/app/helpers/url-helper';


@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  createPageGroup: FormGroup;
  fontList: DictionaryKeyValue[] = [];
  advancedPage = false;
  loading = false;
  userId: number;
  errors: DictionaryKeyValue[];
  smallFileId = 0;
  isSmallPictureInvalid = false;
  smallFilePayloadOnboard = false;
  Banner1File1Id = 0;
  isBanner1PictureInvalid = false;
  Banner1FilePayloadOnboard = false;
  createLargeImageUrl = urlActions.sendBannerPicture;
  updateLargeImageUrl = urlActions.updateBannerPicture;
  createSmallImageUrl = urlActions.sendSmallPicture;
  updateSmallImageUrl = urlActions.updateSmallPicture;


  @select(['loggedInUser']) storedUser;
  @select(['fonts']) fonts;


  constructor(private fb: FormBuilder,
              private restService: RestService,
              private toastr: ToastrService,
              private router: Router) {

    this.createPageGroup = fb.group({
      linkButtonAndroid: new FormControl(''),
      linkButtonIPhone: new FormControl(''),
      linkButtonWinPhone: new FormControl(''),
      pageBackgroundColor: new FormControl(''),
      pageName: new FormControl('', Validators.required),
      userHtml: new FormControl(''),
      heading: new FormControl('', Validators.required),
      headingColor: new FormControl(''),
      smallPictureFile: new FormControl(''),
      largePictureFile: new FormControl(''),
      headingFont: new FormControl(''),
      androidCompat: new FormControl(false),
      iphoneCompat: new FormControl(false),
      winPhoneCompat: new FormControl(false),
      description: new FormControl()
    });
  }

  ngOnInit() {
    this.storedUser.subscribe(auth => {
      this.userId = auth.id;
    });
    this.fonts.subscribe(fon => {
      this.fontList = fon;
    });
  }

  async createPage() {
    if (this.createPageGroup.valid && this.smallFilePayloadOnboard && this.Banner1FilePayloadOnboard) {

      this.loading = true;

      if (this.smallFileId === 0 || this.Banner1File1Id === 0) {
        return;
      }

      const pageData = this.getFormData();
      pageData.smallPictureId = this.smallFileId;
      pageData.bannerImage1Id = this.Banner1File1Id;

      this.sendFormData(pageData);

      } else {
      this.createPageGroup.markAllAsTouched();
    }
  }

  radioButtonChange(toggle) {
    this.advancedPage = toggle;
  }

  getFormData(): Page {
    const pageData: Page = {
      id: 0,
      linkButtonAndroid: this.createPageGroup.get('linkButtonAndroid').value,
      linkButtonIPhone: this.createPageGroup.get('linkButtonIPhone').value,
      linkButtonWinPhone: this.createPageGroup.get('linkButtonWinPhone').value,
      pageBackgroundColor: this.createPageGroup.get('pageBackgroundColor').value,
      pageName: this.createPageGroup.get('pageName').value,
      userId: this.userId,
      userHtml: this.createPageGroup.get('userHtml').value,
      heading: this.createPageGroup.get('heading').value,
      headingColor: this.createPageGroup.get('headingColor').value,
      headingFontId: this.createPageGroup.get('headingFont').value,
      androidCompat: false,
      iphoneCompat: false,
      winPhoneCompat: false,
      description: this.createPageGroup.get('description').value,
      isAdvancedPage: this.advancedPage,
      smallPictureId: 0,
      bannerImage1Id: 0
    };

    if (this.createPageGroup.get('androidCompat').value) {
      pageData.androidCompat = true;
    }
    if (this.createPageGroup.get('winPhoneCompat').value) {
      pageData.winPhoneCompat = true;
    }
    if (this.createPageGroup.get('iphoneCompat').value) {
      pageData.iphoneCompat = true;
    }
    return pageData;
  }

/**
 * Performs the http request with form data.
 * @param pageData Needs to be of type Interface.
 */
  sendFormData(pageData: Page) {
    this.restService.authPostRequest(urlActions.createPage, pageData)
      .subscribe(result => {
      if (result.success) {
        this.loading = false;
        this.toastr.success(result.message, 'Success');
        this.router.navigate(['pagemanagment/editpage/' + result.data]);
        this.loading = false;
      } else {
        this.loading = false;
        this.toastr.error(result.message, 'Failed');
        this.errors = result.data;
      }
    }, (servError => {
      this.loading = false;
      if (servError.message) {
        servError.message = 'There was an issue communicating with the server.  Please try again later.';
      }
      this.toastr.error(servError.message, 'Failed');
    }));
  }

  /**
   * Manages the small picture validation to make sure one has been uploaded.
   * @param should be an image file.
   */
  saveSmallPictureFileId(event) {
    this.smallFilePayloadOnboard = true;
    this.smallFileId = event;
  }

  /**
   * Manages the Larger picture validation to make sure one has been uploaded.
   * @param should be an image file.
   */
  saveBanner1PictureFileId(event) {
    this.Banner1FilePayloadOnboard = true;
    this.Banner1File1Id = event;
  }
}
