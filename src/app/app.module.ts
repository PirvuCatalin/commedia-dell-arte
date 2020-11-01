import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { EnvironmentalLiveComponent } from './environmental-live/environmental-live.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HighchartsChartModule, MDBBootstrapModule.forRoot() , HttpClientModule, BrowserAnimationsModule, MatSliderModule, MatCardModule, NgToggleModule, NgxSliderModule, ReactiveFormsModule, MatTableModule],
  declarations: [ AppComponent, BrandComponent, FooterComponent, NewsfeedComponent, EnvironmentalLiveComponent],
  bootstrap:    [ AppComponent ],
  providers: [Globals]
})
export class AppModule { }
