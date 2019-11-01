import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { rootReducer, IAppState, INITIAL_STATE } from 'src/app/redux/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './components/login/login.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContentDisplayComponent } from './components/landing/content-display/content-display.component';
import { MiniPageViewComponent } from './components/landing/content-display/mini-page-view/mini-page-view.component';
import { ViewPageComponent } from './components/landing/view-page/view-page.component';
import { PageModule } from './components/page-management/page.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    WelcomeComponent,
    ContentDisplayComponent,
    MiniPageViewComponent,
    ViewPageComponent
  ],
  imports: [
    AgmCoreModule.forRoot({}),
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFontAwesomeModule,
    SharedModule,
    LoginModule,
    PageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
              devTools: DevToolsExtension) {
    const storeEnhancers = devTools.isEnabled() ?
      [devTools.enhancer()] :
      [];
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      storeEnhancers);
  }
}
