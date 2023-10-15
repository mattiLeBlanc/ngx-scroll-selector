import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgXScrollSelectorModule } from 'ngx-scroll-selector';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgXScrollSelectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
