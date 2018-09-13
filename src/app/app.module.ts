import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterListComponent,
    MonsterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
