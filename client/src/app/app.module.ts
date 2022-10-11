import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { FieldInputComponent } from '@components/field-input/field-input.component';
import { SideNavComponent } from '@components/side-nav/side-nav.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { RouterService } from '@services/router.service';
import { SpinningLoaderComponent } from '@components/spinning-loader/spinning-loader.component';
import { FormsApiService } from '@services/forms-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserStateInterceptor } from '@interceptors/browser-state.interceptor';
import { ApiHttpInterceptor } from '@interceptors/api.interceptor';

import { ROOT_REDUCERS } from '@store/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntryModeComponent } from '@components/entry-mode/entry-mode.component';
import { MainViewComponent } from '@components/main-view/main-view.component';
import { ViewModeComponent } from '@components/view-mode/view-mode.component';

import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { EditModeEffects } from '@store/effects/edit-mode.effects';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['editMode', 'entryMode'], rehydrate: false, checkStorageAvailability: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    EditModeComponent,
    EntryModeComponent,
    ViewModeComponent,
    FieldInputComponent,
    MainHeaderComponent,
    MainViewComponent,
    SpinningLoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserTransferStateModule,
    HttpClientModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,

    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Yona Forms App',

      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),
    EffectsModule.forRoot([EditModeEffects]),
  ],
  providers: [
    RouterService,
    FormsApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BrowserStateInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
