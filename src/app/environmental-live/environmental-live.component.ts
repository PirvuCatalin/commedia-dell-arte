import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../service/newsfeed.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-environmental-live',
  templateUrl: './environmental-live.component.html',
  styleUrls: ['./environmental-live.component.css']
})

export class EnvironmentalLiveComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];
  
  dataSource : any;

  interval: any;

  meanTemperatures : any;

  constructor(private newsfeedService : NewsfeedService) { }
  
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = {
    tooltip: {
      backgroundColor: {
          stops: [
              [0, '#FFFFFF'],
              [1, '#E0E0E0']
          ]
      },
      borderWidth: 1,
      borderColor: '#AAA'
  },
    title: {
      text: 'Mean temperature'
    },
    subtitle: {
        text: 'Showing the evolution over time'
    },
    yAxis: {
      title: {
        text: "Mean Temperature"
      }
    },
    series: [
      {
        name:"World",
        type: "line",
        data: []
      }
    ]
  };;

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 5000);

    this.newsfeedService.getMeanTemperatures().subscribe(result => {
      let arr = [];
      for(var i in result) {
        arr.push([result[i].year, result[i].mean_temp]);
      }
      this.meanTemperatures = arr;

      this.chartOptions.series[0]["data"] = this.meanTemperatures;
      this.updateFlag = true;
    });
  }

  refreshData(){
    this.newsfeedService.getLiveData().subscribe(liveData => {
      let arr = [];
      arr.push({name: "CO2 emissions this year", uom: "[T]", value: liveData["CO2 emissions this year (tons)"]});
      arr.push({name: "Desertification this year", uom: "[Ha]", value: liveData["Desertification this year (hectares)"]});
      arr.push({name: "Forest loss this year", uom: "[Ha]", value: liveData["Forest loss this year (hectares)"]});
      arr.push({name: "Land lost to soil erosion this year", uom: "[Ha]", value: liveData["Land lost to soil erosion this year (ha)"]});
      arr.push({name: "Toxic chemicals released", uom: "[T]", value: liveData["Toxic chemicals released (tons)"]});
      this.dataSource = arr;
    });
  }

  
}


