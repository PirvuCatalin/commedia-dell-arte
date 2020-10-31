import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { NewsFeed } from '../model/newsfeed';
import { CommonService } from '../service/common.service';
import { NewsfeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  newsfeeds : NewsFeed[] = [];

  constructor(private newsfeedService: NewsfeedService, private globals: Globals, private commonService : CommonService) { }

  ngOnInit(): void {
    this.refreshNewsfeed();

    this.commonService.sliderChangedEvent
    .subscribe((value:number) => {
      this.refreshNewsfeed();
    });
  }

  refreshNewsfeed(): void {
    this.newsfeedService.getNewsfeeds(this.globals.year).subscribe(newsfeeds => {
      this.newsfeeds = newsfeeds;
    });
  }

}
