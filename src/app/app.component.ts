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
import { Options as SliderOptions, ChangeContext} from '@angular-slider/ngx-slider';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit  {
  constructor(private globals: Globals, private commonService: CommonService, private newsfeedService: NewsfeedService) { }
  
  value: number = this.globals.year;
  yearOptions: SliderOptions = {
    floor: 0,
    ceil: 250
  };

  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"]

  monthOptions: SliderOptions = {
    floor: 1,
    ceil: 12,
    showTicks: true,
    getLegend: (value: number): string => {
      return this.months[value-1];
    }
  };

  changeYearOptions(minVal, maxVal) {
    const newOptions: SliderOptions = Object.assign({}, this.yearOptions);
    newOptions.floor = minVal;
    newOptions.ceil = maxVal;
    this.yearOptions = newOptions;
  }

  config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 50,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#56C128',
      unchecked: '#dcdcdc',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson'
    },
    labels: {
      unchecked: 'off',
      checked: 'on',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff'
    }
  };

  yearIntervals : YearIntervals = {
    yearMax: null,
    yearMin: null
  };
  
  updateTemperaturesFlag = false;
  
  countryTemperatures = [];


  ngOnInit(): void {
    this.newsfeedService.getYearIntervals().subscribe(yearIntervals => {
      this.yearIntervals = yearIntervals;
      this.changeYearOptions(this.yearIntervals.yearMin,this.yearIntervals.yearMax);
      this.globals.year = 2003;
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

  yearSliderOnChange(changeContext : ChangeContext) {
    this.globals.year = changeContext.value;
    this.updateTemperatures();
    this.commonService.sliderChanged(changeContext.value);
  }

  monthSliderOnChange(changeContext : ChangeContext) {
    this.globals.month = changeContext.value;
    this.updateTemperatures();
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
