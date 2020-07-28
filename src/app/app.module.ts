import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './search-bar/form/form.component';
import { SearchHomeComponent } from './search-home/search-home.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterListComponent,
    MonsterDetailsComponent,
    SearchBarComponent,
    FormComponent,
    SearchHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
