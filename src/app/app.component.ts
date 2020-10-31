import { Component, OnInit } from "@angular/core";
import Highcharts from "highcharts/highmaps";
import { Options } from "highcharts";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import { MatSliderChange } from '@angular/material/slider';
import { Globals } from './model/globals';
import { CommonService } from './service/common.service';
import { NewsfeedService } from './service/newsfeed.service';
import { YearIntervals } from './model/yearIntervals';
import { CountryTemperature } from './model/countryTemperature';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit  {
  constructor(private globals: Globals, private commonService: CommonService, private newsfeedService: NewsfeedService) { }
  
  yearIntervals : YearIntervals = {
    yearMax: null,
    yearMin: null
  };
  updateTemperaturesFlag = false;
  countryTemperatures = [];

  ngOnInit(): void {
    this.newsfeedService.getYearIntervals().subscribe(yearIntervals => {
      this.yearIntervals = yearIntervals;
    });

    this.updateTemperatures();
  }

  updateTemperatures(): void {
    this.newsfeedService.getTemperatures(this.globals.year, this.globals.month).subscribe(countryTemperatures => {
      this.countryTemperatures = countryTemperatures;

      this.chartOptions.series[0]["data"] = this.countryTemperatures;

      this.updateTemperaturesFlag = true;
      
    });
  }

  sliderOnChange(value: number) {
    this.globals.year = value;
    this.updateTemperatures();
    this.commonService.sliderChanged(value);
  }
  
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  chartOptions: Options = {
    chart: {
      map: worldMap as any,
      backgroundColor: '#C0C0C0'
    },
    title: {
      text: "Highmaps basic demo"
    },
    subtitle: {
      text:
        'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: -20,
      max: 40,
      labels: {
          format: '{value}°C'
      },
      stops: [
          [0, '#0000ff'],
          [0.3, '#6da5ff'],
          [0.6, '#ffff00'],
          [1, '#ff0000']
      ]
  },
    series: [
      {
        type: "map",
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        keys: ['name', 'value'],
        joinBy: 'name',
        data: this.countryTemperatures
      }
    ]
  };
}
