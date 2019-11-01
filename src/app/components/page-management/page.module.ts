import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageManagementComponent } from './page-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreatePageComponent } from './create-page/create-page.component';
import { PageRoutingModule } from './page.routing.module';
import { EditPageComponent } from './edit-page/edit-page.component';


@NgModule({
  declarations: [
    PageManagementComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageRoutingModule,
    NgbModule.forRoot(),
    SharedModule
  ],
  exports: [
    PageManagementComponent,
    PageRoutingModule
  ],
  providers: [
  ]
})
export class PageModule { }
