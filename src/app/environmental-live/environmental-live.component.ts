import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-environmental-live',
  templateUrl: './environmental-live.component.html',
  styleUrls: ['./environmental-live.component.css']
})

export class EnvironmentalLiveComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];
  
  dataSource : any;

  interval: any;

  constructor(private newsfeedService : NewsfeedService) { }

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 1000);
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
