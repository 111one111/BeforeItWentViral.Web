import { environment } from '../../environments/environment';
import { Injectable, OnInit} from '@angular/core';

export const urlExtensions = {
  countryList: 'countrylist',
  user: 'user/',
  page: 'page/',
  file: 'file/',
  pageSlot: 'pageslot/',
  account: 'account/',
  validation: 'validator',
  lostPassword: 'lostpassword',
  resetPassword: 'resetpassword',
  fontList: 'fontlist',
  sendSmallPicture: 'sendsmallpicture',
  updateSmallPicture: 'updatesmallpicture/{{a}}',
  sendBannerPicture: 'sendbannerpicture',
  updateBannerPicture: 'updatebannerpicture/{{a}}',
  getMiniPages: 'getMiniPages',
  createPage: 'createpage',
  login: 'login',
  editPage: 'editPage',
  getPlans: 'getplans',
  getPlan: 'getPlan',
  getPage: 'getpage/{{a}}',
  getImageDetails: 'getImageDetails/{{a}}',
  getUsersPages: 'getuserspages/{{a}}',
  getDisplaySlotList: 'GetSlotList/{{a}}',
  getImage: 'getimage/{{a}}',
  updateStatus: 'updatestatus',
  updatePage: 'updatePage',
  searchPage: 'search/{{a}}',
  validate: 'validator',
};

export  const urlPaths = {
  login: 'login',
  register: 'register',
  createPage: 'createpage',
  editPage: 'editpage/{{a}}',
  viewPage: '/viewpage/{{a}}',
  searchPage: '/search/{{a}}'
};

/**
 * Contains Urls for Api calls.
 */
export const urlActions = {
  countryList: environment.api + urlExtensions.user + urlExtensions.countryList,
  registerUser: environment.api + urlExtensions.user,
  validateUser: environment.api + urlExtensions.user + urlExtensions.validate,
  fontList: environment.api + urlExtensions.page + urlExtensions.fontList,
  userRest: environment.api + urlExtensions.user,
  userValidation: environment.api + urlExtensions.user + urlExtensions.validation,
  userLogin: environment.api + urlExtensions.user + urlExtensions.login,
  userLostPassword: environment.api + urlExtensions.user + urlExtensions.lostPassword,
  userResetPassword: environment.api + urlExtensions.user + urlExtensions.resetPassword,
  createPage: environment.api + urlExtensions.page + urlExtensions.createPage,
  getUsersPages: environment.api + urlExtensions.page + urlExtensions.getUsersPages,
  getDisplaySlots: environment.api + urlExtensions.pageSlot + urlExtensions.getDisplaySlotList,
  getMiniPages: environment.api + urlExtensions.page + urlExtensions.getMiniPages,
  editPage: environment.api + urlExtensions.page + urlExtensions.editPage,
  getPage: environment.api + urlExtensions.page + urlExtensions.getPage,
  searchPage: environment.api + urlExtensions.page + urlExtensions.searchPage,
  getPlans: environment.api + urlExtensions.account + urlExtensions.getPlans,
  getPlan: environment.api + urlExtensions.account + urlExtensions.getPlan,

  getImage: environment.api + urlExtensions.file + urlExtensions.getImage,
  getImageDetails: environment.api + urlExtensions.file + urlExtensions.getImageDetails,
  updateSmallPicture: environment.api + urlExtensions.file + urlExtensions.updateSmallPicture,
  sendSmallPicture: environment.api + urlExtensions.file + urlExtensions.sendSmallPicture,
  updateBannerPicture: environment.api + urlExtensions.file + urlExtensions.updateBannerPicture,
  sendBannerPicture: environment.api + urlExtensions.file + urlExtensions.sendBannerPicture,
  updateSlotStatus: environment.api + urlExtensions.pageSlot + urlExtensions.updateStatus,
  updateSlotPage: environment.api + urlExtensions.pageSlot + urlExtensions.updatePage,
};

/**
 * Contains page redirection Url's.
 */
export const pageRedirection = {
  userLogin: urlPaths.login,
  userRegister: urlPaths.register,
  editPage: urlPaths.editPage
};

/**
 * Supplies a list of values that can be replaced.
 */
@Injectable({
  providedIn: 'root'
})
export class UrlHelper {

  private replacementCharList = [
    '{{a}}',
    '{{b}}',
    '{{c}}',
    '{{d}}',
    '{{e}}',
    '{{f}}',
    '{{g}}',
    '{{h}}',
    '{{i}}',
    '{{j}}'
  ];

  /**
   * Replaces characters in a string, String should contain characters a-j in lower case using the {{a}} format as an example
   */
  transformUrl( paramList: string[], url: string ): string {

    if (this.replacementCharList.length < paramList.length) {
      return;
    }
    for (let commonIndex = 0; commonIndex < paramList.length ; commonIndex++) {
      url = url.replace(this.replacementCharList[commonIndex], paramList[commonIndex]);
    }
    return url;
  }
}
