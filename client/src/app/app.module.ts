import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { FieldInputComponent } from '@components/field-input/field-input.component';
import { SideNavComponent } from '@components/side-nav/side-nav.component';
import { MainHeaderComponent } from '@components/main-header/main-header.component';
import { RouterService } from '@services/router.service';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    EditModeComponent,
    FieldInputComponent,
    MainHeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,

    StoreModule.forRoot({}, {}),
  ],
  providers: [RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
