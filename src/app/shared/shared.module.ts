import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { UrlHelper } from '../helpers/url-helper';
import { ValidationErrorDisplayComponent } from './validation-error-display/validation-error-display.component';
import { AgmCoreModule } from '@agm/core';
import { ImageInputFileControlComponent } from './image-input-file-control/image-input-file-control.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule
  ],
  declarations: [
    ValidationErrorDisplayComponent,
    ImageInputFileControlComponent
    ],
  exports: [
    FormsModule,
    ValidationErrorDisplayComponent,
    ImageInputFileControlComponent
  ],
  providers: [
    UrlHelper
  ]
})
export class SharedModule { }
