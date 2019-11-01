import { Component, OnInit } from '@angular/core';

import { RestService } from 'src/app/services/rest.service';
import { urlActions } from 'src/app/helpers/url-helper';
import { MiniPage } from 'src/app/interfaces/mini.page.interface';


@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent implements OnInit {

miniPages: MiniPage[];


constructor(private restService: RestService) { }

  ngOnInit() {

    this.restService.getRequest(urlActions.getMiniPages).subscribe(result => {
        if (result.success) {
          this.miniPages = result.data;
        }
      }
    );
  }
}


