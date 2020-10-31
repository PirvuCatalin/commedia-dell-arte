import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { NewsFeed } from '../model/newsfeed';
import { ResultInterface } from '../model/resultInterface';
import { Globals } from '../model/globals';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  newsfeedUrl = "https://mysterious-reef.herokuapp.com/get_articles?number_of_articles=2&year=";

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

}
