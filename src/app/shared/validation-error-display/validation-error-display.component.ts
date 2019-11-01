import {Component, Input, OnInit} from '@angular/core';

import { Observable } from 'rxjs';
import { DictionaryKeyValue } from 'src/app/interfaces/dictionary-key-value.interface';


@Component({
  selector: 'app-validation-error-display',
  template:
     `<div *ngFor="let err of errors">
            <div *ngIf="err.key === fieldName" >{{err.value}}</div>
      </div>`
})
export class ValidationErrorDisplayComponent implements OnInit {

  @Input()
  errors: Observable<DictionaryKeyValue[]>;

  @Input()
  fieldName: string;

  constructor() { }

  ngOnInit() {
  }

}
