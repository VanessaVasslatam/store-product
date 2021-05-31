import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {Routing} from "./app.routing";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { MaterialModule } from './material.module'
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HomeUpdateDialogComponent } from './home/home-update-dialog/home-update-dialog.component';
import { HomeCreateComponent } from './home/home-create/home-create.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    HomeUpdateDialogComponent,
    HomeCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MaterialModule,  
    MatTableModule, 
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    HomeUpdateDialogComponent,
    HomeCreateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
