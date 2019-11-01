import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Page } from 'src/app/interfaces/page.interface';
import { RestService } from 'src/app/services/rest.service';
import { UrlHelper, urlActions } from 'src/app/helpers/url-helper';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})

export class ViewPageComponent implements OnInit {

  pageIdentifier = 'pageId';
  showImage = false;
  imageData;
  pageId: number;
  pageData: Page;
  headingFont = '';
  @select(['fonts']) fonts;

  constructor(private activatedRoute: ActivatedRoute, private restService: RestService, private urlHelper: UrlHelper) { }

  ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    this.pageId = params[this.pageIdentifier];
    this.loadExistingData();
  });
  }

  loadExistingData() {
    this.restService.getRequest(this.urlHelper.transformUrl([this.pageId.toString()], urlActions.getPage)).subscribe(result => {
      if (result.success) {
        this.pageData = result.data;
        this.styleBuilder();
       // if (this.pageData.bannerImage1Id !== null) {
        //  this.accessFileService.getImage(this.pageData.bannerImage1Id).subscribe(image => {
        //    this.imageData = 'data:image/jpeg;base64,' + image.data;
         //   this.showImage = true;
         // });
        // }
      }
    });
  }

  styleBuilder() {
    if (this.pageData.headingFontId) {
      let fontName = '';
      this.fonts.subscribe(fon => {
        fontName = fon[this.pageData.headingFontId - 1].value;
        this.headingFont = fontName;
      });
    }
  }

  btnAndroid() {
    window.open(this.pageData.linkButtonAndroid, '_blank');
  }

  btnIphone() {
    window.open(this.pageData.linkButtonIPhone, '_blank');
  }

  btnWindows() {
    window.open(this.pageData.linkButtonWinPhone, '_blank');
  }
}
