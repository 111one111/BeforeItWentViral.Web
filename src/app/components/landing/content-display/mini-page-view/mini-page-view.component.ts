import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlHelper, urlPaths } from 'src/app/helpers/url-helper';

@Component({
  selector: 'app-mini-page-view',
  templateUrl: './mini-page-view.component.html',
  styleUrls: ['./mini-page-view.component.css']
})
export class MiniPageViewComponent implements OnInit {
  @Input() miniPageData;

  constructor(private router: Router, private urlHelper: UrlHelper) { }

  ngOnInit() {

  }

  goToPage() {
      this.router.navigate([this.urlHelper.transformUrl([this.miniPageData.pageId
      .toString()], urlPaths.viewPage)]);
  }

}
