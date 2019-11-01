import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAppState } from 'src/app/redux/store';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  searchGroup: FormGroup;

  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>, private router: Router) {
    this.searchGroup = fb.group({
      postcode: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }


}
