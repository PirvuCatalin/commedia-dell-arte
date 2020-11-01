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
    ceil: 2003
  };

  interval: any;

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
    value: false,
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

  countriesInfo = [];

  ngOnInit(): void {
    this.newsfeedService.getYearIntervals().subscribe(yearIntervals => {
      this.yearIntervals = yearIntervals;
      this.changeYearOptions(this.yearIntervals.yearMin,this.yearIntervals.yearMax);
      this.globals.year = 2003;
    });

    this.newsfeedService.getCountriesInfo().subscribe(countriesInfo => {
      this.countriesInfo = countriesInfo;
      
      let index = -1;
      for(var i in this.countriesInfo) {
        if (Object.keys(this.countriesInfo[i])[0] === "Antarctica") {
          index = parseInt(i);
          break;
        }
      }
      if (index > -1) {
        this.countriesInfo.splice(index, 1);
      }

      this.countriesInfo.sort((a,b) =>  (Object.keys(a)[0] > Object.keys(b)[0] ? 1 : -1 ));

      this.updateTemperatures();
    });

  }

  updateTemperatures(): void {
    this.newsfeedService.getTemperatures(this.globals.year, this.globals.month).subscribe(countryTemperatures => {
      this.countryTemperatures = countryTemperatures;
    
      this.countryTemperatures.splice(0,1);

      this.countryTemperatures.sort((a,b) =>  (a.country > b.country ? 1 : -1 ));

      let countryTemps = [];

      for(var i in this.countryTemperatures) {

        

          if(this.countryTemperatures[i]["country"] === "United States") {
            this.countryTemperatures[i]["country"] = "United States of America"
            if(this.countriesInfo[i]["United States"]){
              countryTemps.push(["United States of America", this.countryTemperatures[i]["temp"], 
          this.countriesInfo[i]["United States"][0], this.countriesInfo[i]["United States"][1], this.countriesInfo[i]["United States"][2]]);
            } else {
              countryTemps.push(["United States of America", this.countryTemperatures[i]["temp"]]);
            }
            
          continue;
          } else if(this.countryTemperatures[i]["country"] === "Bahamas") {
            this.countryTemperatures[i]["country"] = "The Bahamas"
            countryTemps.push(["The Bahamas", this.countryTemperatures[i]["temp"]]);
          continue;
          } else if(this.countryTemperatures[i]["country"] === "Serbia") {
            this.countryTemperatures[i]["country"] = "Reublic of Serbia"
            countryTemps.push(["Reublic of Serbia", this.countryTemperatures[i]["temp"]]);
          continue;
          } else if(this.countryTemperatures[i]["country"] === "C\u00f4te D'Ivoire") {
            this.countryTemperatures[i]["country"] = "Ivory Coast"
            countryTemps.push(["Ivory Coast", this.countryTemperatures[i]["temp"]]);
          continue;
          } else if(this.countryTemperatures[i]["country"] === "Cayman Islands") {
            continue;
          } else if(this.countryTemperatures[i]["country"] === "Svalbard And Jan Mayen") {
            continue;
          } else if(this.countryTemperatures[i]["country"] === "Oceania") {
            continue;
          } else if(this.countryTemperatures[i]["country"] === "Sudan") {
            countryTemps.push(["South Sudan", this.countryTemperatures[i]["temp"]]);
          } else if(this.countryTemperatures[i]["country"] === "Tanzania") {
            this.countryTemperatures[i]["country"] = "United Republic of Tanzania";
            countryTemps.push(["United Republic of Tanzania", this.countryTemperatures[i]["temp"]]);
          continue;
          } else if(this.countryTemperatures[i]["country"] === "Congo" || this.countryTemperatures[i]["country"] === "Congo (Democratic Republic Of The)") {
            this.countryTemperatures[i]["country"] = "Democratic Republic of the Congo";
            countryTemps.push(["Democratic Republic of the Congo", this.countryTemperatures[i]["temp"]]);
            countryTemps.push(["Republic of Congo", this.countryTemperatures[i]["temp"]]);
            continue;
          }
          

          if(this.countriesInfo[i][this.countryTemperatures[i]["country"]]) {
            countryTemps.push([this.countryTemperatures[i]["country"], this.countryTemperatures[i]["temp"], 
            this.countriesInfo[i][this.countryTemperatures[i]["country"]][0], this.countriesInfo[i][this.countryTemperatures[i]["country"]][1], this.countriesInfo[i][this.countryTemperatures[i]["country"]][2]]);
          } else {
            countryTemps.push([this.countryTemperatures[i]["country"], this.countryTemperatures[i]["temp"], "","",""]);
          }
          
      }

      this.chartOptions.series[0]["data"] = countryTemps;

      this.updateTemperaturesFlag = true;
    });

    this.updateGmsl();
    this.updateCO2Ppm();
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
      text: "Historical temperature & prediction"
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
        name: "Top factors:",
        tooltip: {
            pointFormat: '<br>{point.info1}<br> {point.info2}<br> {point.info3} '
        },
        states: {
          hover: {
            color: "#000000"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        keys: ['name', 'value', 'info1', 'info2', 'info3'],
        joinBy: 'name',
        data: this.countryTemperatures
      }
    ]
  };

  buttonChanged(e : any) : void {
    if (!(e instanceof Event)) {
      this.setTemperatureMapState(e);
    }
  }

  setTemperatureMapState(val : boolean): void {
    if (val) {
      this.liveUpdateTemperatures();
      this.interval = setInterval(() => { 
          this.liveUpdateTemperatures(); 
      }, 5000);
    } else {
      clearInterval(this.interval);
    }
  }

  liveUpdateTemperatures() : void {
    if(this.globals.month == 12) {
      this.globals.year = this.globals.year + 1;
      this.globals.month = 1;
    } else {
      this.globals.month = this.globals.month + 1;
    }
    if(this.yearIntervals.yearMax == this.globals.year) {
      clearInterval(this.interval);
    }
    this.updateTemperatures();
  }

  gmsl : any = null;
  
  updateGmsl() : void {
    this.newsfeedService.getSeaLevel(this.globals.year, this.globals.month).subscribe(gmsl => {
      if(gmsl[0] == undefined) {
        this.gmsl = "N/A";
      } else {
        this.gmsl = gmsl[0]["gmsl"];
      }
    });
  }

  co2_ppm : any = null;
  
  updateCO2Ppm() : void {
    this.newsfeedService.getCO2PpmUrl(this.globals.year, this.globals.month).subscribe(co2_ppm => {
      if(co2_ppm[0] == undefined) {
        this.co2_ppm = "N/A";
      } else {
        this.co2_ppm = co2_ppm[0]["co2_ppm"];
      }
    });
  }
}
