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

import { EditModeComponent } from './components/edit-mode/edit-mode.component';
import { FieldInputComponent } from '@components/field-input/field-input.component';

@NgModule({
  declarations: [
    AppComponent,
    EditModeComponent,
    FieldInputComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,

    // Modules
    ReactiveFormsModule,
    FormsModule,

    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
