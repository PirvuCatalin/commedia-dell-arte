import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrandComponent } from './brand/brand.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HighchartsChartModule ],
  declarations: [ AppComponent, BrandComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
