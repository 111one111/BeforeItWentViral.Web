import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { UrlHelper, urlActions } from 'src/app/helpers/url-helper';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private restService: RestService ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
     const validation = { userID: +params.get('userId'), validationCode: params.get('validator')};
     this.restService.postRequest(urlActions.validateUser, validation).subscribe(message => {
       }
     );
    });
  }

}
