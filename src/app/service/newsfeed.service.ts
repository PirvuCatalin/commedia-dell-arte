import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { NewsFeed } from '../model/newsfeed';
import { ResultInterface } from '../model/resultInterface';
import { Globals } from '../model/globals';
import { YearIntervals } from '../model/yearIntervals';
import { CountryTemperature } from '../model/countryTemperature';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  //gmsl
  //max 85
  //min -185
  newsfeedUrl = "https://utilitary-services.herokuapp.com/get_articles?number_of_articles=3&year=";
  intervalYearsUrl = "https://utilitary-services.herokuapp.com/get_interval_heads";
  temperaturesUrl = "https://utilitary-services.herokuapp.com/get_temperatures";
  countryInfoUrl = "https://utilitary-services.herokuapp.com/get_country_info";
  liveDataUrl = "https://mysterious-reef.herokuapp.com/get_live_data";
  seaLevelUrl = "http://mysterious-reef.herokuapp.com/get_sea_level";
  cO2PpmUrl = "http://mysterious-reef.herokuapp.com/get_co2_ppm";
  meanTemperaturesUrl = "http://mysterious-reef.herokuapp.com/get_mean_temperatures";

  mockNewsfeeds : NewsFeed[] = [
    {title:"Un titlu de articol foarte smecher cu catei aruncati de pe marte.", year:2019, link:"https://www.google.ro"},
    {title:"Pinguinii spinosi vor disparea in curand de pe planeta!", year:2019, link:"https://www.google.ro"}
  ];

  constructor(private http: HttpClient, private globals: Globals) { }

  getNewsfeeds(year: number): Observable<NewsFeed[]> {
    return this.http.get<ResultInterface>(this.newsfeedUrl + this.globals.year).pipe(
      map(results => { 
        let newsfeeds : NewsFeed[] = [];

        for(var i in results.result) {
          newsfeeds.push(plainToClass(NewsFeed, results.result[i] as Object));
        }
        
        return newsfeeds;
      })
    );

    // return of(this.mockNewsfeeds);
  }

  getCountriesInfo(): Observable<JSON[]> {
    return this.http.get(this.countryInfoUrl).pipe(
      map(results => { 
        return results["result"];
      })
    );
  }



  getYearIntervals() : Observable<YearIntervals> {
    return this.http.get<ResultInterface>(this.intervalYearsUrl).pipe(
      map(results => {
        let yearIntervals : YearIntervals = new YearIntervals;
        yearIntervals.yearMin = results.result["minimum"]["year"];
        yearIntervals.yearMax = results.result["maximum"]["year"];
        return yearIntervals;
      })
    );
  }

  getTemperatures(year: number, month: number): Observable<JSON[]> {
    return this.http.get(this.temperaturesUrl + `?year=${this.globals.year}&month=${this.globals.month}` ).pipe(
      map(results => { 

        return results["result"];
        
      })
    );
  }

  getLiveData(): Observable<JSON> {
    return this.http.get<ResultInterface>(this.liveDataUrl).pipe(
      map(results => { 
        return results["result"];
      })
    );
  }  

  getSeaLevel(year: number, month: number): Observable<JSON> {
    return this.http.get(this.seaLevelUrl + `?year=${this.globals.year}&month=${this.globals.month}` ).pipe(
      map(results => { 
        return results["result"];
      })
    );
  }

  getCO2PpmUrl(year: number, month: number): Observable<JSON> {
    return this.http.get(this.cO2PpmUrl + `?year=${this.globals.year}&month=${this.globals.month}` ).pipe(
      map(results => { 
        return results["result"];
      })
    );
  }

  getMeanTemperatures(): Observable<any> {
    return this.http.get(this.meanTemperaturesUrl).pipe(
      map(results => { 
        return results;
      })
    );
  }
}
