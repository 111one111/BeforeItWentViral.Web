import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Response } from 'src/app/interfaces/response.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestService } from 'src/app/services/rest.service';
import { urlActions, UrlHelper } from 'src/app/helpers/url-helper';

@Component({
  selector: 'app-input-file-control',
  template: `
      <div class = "input-group">
        <div class="input-group-addon" style="width: 2.6rem" (click)="fileInput.click()"><i class="fa fa-file"></i></div>
        <input class="form-control" type = "text" placeholder="Choose file..." (click)="fileInput.click()"
               [value]="showFieldValue" (keypress)="noManualChanging($event)" (change) = "possibleDelete()"/>
      </div>
      <input id="fileInput" type="file" class="hide-me-input" [accept]="fileTypes" (change)="onFileChange($event)"
           (click)="onFileChange($event)" #fileInput>
      <div *ngIf="!isValidLocal||showInvalidMessage"  class="error-message text-right">
        {{errorMessage}}
      </div>
      <div class="pt-2 float-right">
        <button class="btn btn-secondary rem-5" (click)="saveImage()"><i class="fa fa-circle-o-notch fa-spin fa-fw"
                                                                               *ngIf="isLoading"></i> Upload</button>
      </div>
  `,
  styleUrls: ['./image-input-file-control.component.css']
})
export class ImageInputFileControlComponent implements OnChanges {

  @Input()
  imageFileId = 0;
  @Input()
  fileTypes = '';

  showFieldValue = '';
  @Input()
  isRequired: boolean;
  @Input()
  errorMessage: string;
  @Input()
  showInvalidMessage = false;
  @Input()
  urlCreateImage = '';
  @Input()
  urlUpdateImage = '';


  @Output()
  file = new EventEmitter();
  @Output()
  isValid = new EventEmitter();

  isValidLocal = true;
  private fileData = new FormData();
  isLoading = false;

  constructor(private toastr: ToastrService,
              private restService: RestService,
              private router: Router,
              private urlHelper: UrlHelper) { }

  ngOnChanges() {
    if (this.imageFileId !== 0) {
      this.restService.getRequest(this.urlHelper.transformUrl([this.imageFileId.toString()], urlActions.getImageDetails))
      .subscribe(fileResult => {
        this.showFieldValue = fileResult.data.fileName;
      });
    } else {
      this.showFieldValue = '';
    }
  }

  validTest() {
    if (this.showFieldValue === '') {
      this.isValidLocal = false;
    } else {
      this.isValidLocal = true;
    }
  }

  noManualChanging(event) {
    event.preventDefault();
  }

  possibleDelete() {
    this.isValidLocal = false;
  }

  onFileChange(eve) {
    if (eve.type === 'change') {
      if (eve.target.files && eve.target.files.length > 0) {
        this.showInvalidMessage = false;
        this.isValidLocal = true;
        const uploadFile = eve.target.files[0];
        this.fileData.append('File', uploadFile);
        this.showFieldValue = uploadFile.name;
      } else {
        this.showFieldValue = '';
        if (!this.isRequired) {
          return;
        }
        this.validTest();
      }
    }
  }

  async saveImage() {
    if (this.imageFileId === 0) {
       this.sendImageFile().then( id => {
         this.imageFileId = id;
         this.file.emit(id);
       });
    } else {
      this.updateImageFile().then( id => {
        this.file.emit(this.imageFileId);
      });
    }
  }

  async updateImageFile(): Promise<number> {
    this.isLoading = true;
    const fileResponse = await this.restService.promiseAuthPutRequest(this.urlUpdateImage, this.fileData)
      .catch(rej => {
        if (rej.status === 401) {
          this.router.navigate(['/login']);
          this.toastr.error('Your session has timed out please login again', 'Failed');
          return;
        }
        const response: Response = {
          success: false,
          message: 'There was an issue communicating with the server.  Please try again later.',
          data: null
        };
        return response;
      });
    this.isLoading = false;
    if (fileResponse.success) {
      return fileResponse.data;
    } else {
      this.toastr.error(fileResponse.message, 'Failed');
    }
    return 0;
  }

  async sendImageFile(): Promise<number> {
    this.isLoading = true;
    const fileResponse = await this.restService.promiseAuthPutRequest(this.urlCreateImage, this.fileData)
      .catch(rej => {
        if (rej.status === 401) {
          this.router.navigate(['/login']);
          this.toastr.error('Your session has timed out please login again', 'Failed');
          return;
        }
        const response: Response = {
          success: false,
          message: 'There was an issue communicating with the server.  Please try again later.',
          data: []
        };
        return response;
      });
    this.isLoading = false;
    if (fileResponse.success) {
      return fileResponse.data;
    } else {
      this.toastr.error(fileResponse.message, 'Failed');
    }
    return 0;
  }
}
