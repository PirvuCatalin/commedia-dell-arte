import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrandComponent } from './brand/brand.component';
import { FooterComponent } from './footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { Globals } from './model/globals';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HighchartsChartModule, MDBBootstrapModule.forRoot() , HttpClientModule, BrowserAnimationsModule, MatSliderModule, MatCardModule],
  declarations: [ AppComponent, BrandComponent, FooterComponent, NewsfeedComponent ],
  bootstrap:    [ AppComponent ],
  providers: [Globals]
})
export class AppModule { }
