import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { NewsFeed } from '../model/newsfeed';
import { NewsfeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  newsfeeds : NewsFeed[];

  constructor(private newsfeedService: NewsfeedService, private globals: Globals) { }

  ngOnInit(): void {
    this.newsfeedService.getNewsfeeds(this.globals.year).subscribe(newsfeeds => {
      this.newsfeeds = newsfeeds;
      console.log(this.newsfeeds);
    });
  }

}
