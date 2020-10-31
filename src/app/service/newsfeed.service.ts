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
  newsfeedUrl = "https://mysterious-reef.herokuapp.com/get_articles?number_of_articles=3&year=";
  intervalYearsUrl = "https://mysterious-reef.herokuapp.com/get_interval_heads";
  temperaturesUrl = "https://mysterious-reef.herokuapp.com/get_temperatures";

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
    return this.http.get<ResultInterface>(this.temperaturesUrl + `?year=${this.globals.year}&month=${this.globals.month}` ).pipe(
      map(results => { 
        let countryTemperatures = [];

        for(var i in results.result) {
          if(results.result[i]["country"] === "United States") {
            results.result[i]["country"] = "United States of America"
          } else if(results.result[i]["country"] === "Bahamas") {
            results.result[i]["country"] = "The Bahamas"
          } else if(results.result[i]["country"] === "Serbia") {
            results.result[i]["country"] = "Reublic of Serbia"
          } else if(results.result[i]["country"] === "C\u00f4te D'Ivoire") {
            results.result[i]["country"] = "Ivory Coast"
          } else if(results.result[i]["country"] === "Cayman Islands") {
            continue;
          } else if(results.result[i]["country"] === "Svalbard And Jan Mayen") {
            continue;
          } else if(results.result[i]["country"] === "Oceania") {
            continue;
          } else if(results.result[i]["country"] === "Sudan") {
            countryTemperatures.push(["South Sudan", results.result[i]["temp"]]);
          } else if(results.result[i]["country"] === "Tanzania") {
            results.result[i]["country"] = "United Republic of Tanzania";
          } else if(results.result[i]["country"] === "Congo" || results.result[i]["country"] === "Congo (Democratic Republic Of The)") {
            results.result[i]["country"] = "Democratic Republic of the Congo";
            countryTemperatures.push(["Republic of Congo", results.result[i]["temp"]]);
          }
          countryTemperatures.push([results.result[i]["country"], results.result[i]["temp"]]);
        }

        return countryTemperatures;
      })
    );
}
}
