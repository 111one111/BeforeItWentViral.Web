import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DictionaryKeyValue } from 'src/app/interfaces/dictionary-key-value.interface';
import { select } from '@angular-redux/store';
import { RestService } from 'src/app/services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/interfaces/page.interface';
import { UrlHelper, urlActions } from 'src/app/helpers/url-helper';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  editPageGroup: FormGroup;
  fontList: DictionaryKeyValue;
  advancedPage = false;
  loading = false;
  userId: number;
  errors: DictionaryKeyValue[];
  pageId = 0;

  smallPicId = 0;
  bannerPic1Id = 0;

  smallFilePayloadOnboard = false;
  bannerPic1PayloadOnBoard = false;

  createLargeImageUrl = urlActions.sendBannerPicture;
  updateLargeImageUrl = urlActions.updateBannerPicture;
  createSmallImageUrl = urlActions.sendSmallPicture;
  updateSmallImageUrl = urlActions.updateSmallPicture;

  @select(['loggedInUser']) storedUser;
  @select(['fonts']) fonts;

  constructor(private fb: FormBuilder,
              private restService: RestService,
              private toastr: ToastrService,
              private urlHelper: UrlHelper,
              private activatedRoute: ActivatedRoute) {

    this.editPageGroup = fb.group({
      linkButtonAndroid: new FormControl(''),
      linkButtonIPhone: new FormControl(''),
      linkButtonWinPhone: new FormControl(''),
      pageBackgroundColor: new FormControl(''),
      pageName: new FormControl('', Validators.required),
      userHtml: new FormControl(''),
      heading: new FormControl('', Validators.required),
      headingColor: new FormControl(''),
      smallPictureFile: new FormControl(''),
      Banner1File: new FormControl(''),
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
    this.activatedRoute.params.subscribe(params => {
      const pageId = 'pageId';
      this.pageId = +params[pageId];
      this.loadExistingData();
    });
    this.fonts.subscribe(fon => {
      this.fontList = fon;
    });
  }

  loadExistingData() {
    this.restService.authGetRequest(this.urlHelper.transformUrl([this.pageId.toString()], urlActions.getPage))
      .subscribe(result => {
      if (result.success) {
        const pageData: Page = result.data;
        this.editPageGroup = this.fb.group({
          linkButtonAndroid: new FormControl(pageData.linkButtonAndroid),
          linkButtonIPhone: new FormControl(pageData.linkButtonIPhone),
          linkButtonWinPhone: new FormControl(pageData.linkButtonWinPhone),
          pageBackgroundColor: new FormControl(pageData.pageBackgroundColor),
          pageName: new FormControl(pageData.pageName, Validators.required),
          userHtml: new FormControl(pageData.userHtml),
          heading: new FormControl(pageData.heading, Validators.required),
          headingColor: new FormControl(pageData.headingColor),
          smallPictureFile: new FormControl(''),
          Banner1File: new FormControl(''),
          largePictureFile: new FormControl(''),
          headingFont: new FormControl(pageData.headingFontId),
          androidCompat: new FormControl(pageData.androidCompat),
          iphoneCompat: new FormControl(pageData.iphoneCompat),
          winPhoneCompat: new FormControl(pageData.winPhoneCompat),
          description: new FormControl(pageData.description)
        });
        this.smallPicId = pageData.smallPictureId;
        this.bannerPic1Id = pageData.bannerImage1Id;
        this.advancedPage = pageData.isAdvancedPage;
      }
    });
  }

  async editPage() {
    if (this.editPageGroup.valid) {

      this.loading = true;
      const pageData = this.getFormData();
      this.sendFormData(pageData);

    } else {
      this.editPageGroup.markAsTouched();
    }
  }

  radioButtonChange(toggle) {
    this.advancedPage = toggle;
  }

  getFormData(): Page {
    const pageData: Page = {
      id: this.pageId,
      linkButtonAndroid: this.editPageGroup.get('linkButtonAndroid').value,
      linkButtonIPhone: this.editPageGroup.get('linkButtonIPhone').value,
      linkButtonWinPhone: this.editPageGroup.get('linkButtonWinPhone').value,
      pageBackgroundColor: this.editPageGroup.get('pageBackgroundColor').value,
      pageName: this.editPageGroup.get('pageName').value,
      userId: this.userId,
      userHtml: this.editPageGroup.get('userHtml').value,
      heading: this.editPageGroup.get('heading').value,
      headingColor: this.editPageGroup.get('headingColor').value,
      headingFontId: this.editPageGroup.get('headingFont').value,
      androidCompat: this.editPageGroup.get('androidCompat').value,
      iphoneCompat: this.editPageGroup.get('iphoneCompat').value,
      winPhoneCompat: this.editPageGroup.get('winPhoneCompat').value,
      description: this.editPageGroup.get('description').value,
      isAdvancedPage: this.advancedPage,
      smallPictureId: this.smallPicId,
      bannerImage1Id: this.bannerPic1Id
    };

    return pageData;
  }

  sendFormData(pageData: Page) {
    this.restService.authPutRequest(urlActions.editPage, pageData)
      .subscribe(result => {
      if (result.success) {
        this.loading = false;
        this.toastr.success(result.message, 'Success');
        this.loading = false;
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
  }

  saveSmallPictureFile(fileId) {
    this.smallFilePayloadOnboard = true;
    this.smallPicId = fileId;
  }

  saveBanner1PictureFile(fileId) {
    this.bannerPic1PayloadOnBoard = true;
    this.bannerPic1Id = fileId;
  }
}


