import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  variable : string = "Loading";
  months = [
    "Green is the fresh emblem of well founded hopes. In blue the spirit can wander, but in green it can rest.",
    "Nature in her green tranquil woods heals and soothes all afflictions.",
    "Nature's first green is gold.",
    "Green fingers are the extension of a verdant heart.",
    "All our wisdom is stored in the trees.",
    "Colorless green ideas sleep furiously.",
    "No water, no life. No blue, no green."

  ];

  random = Math.floor(Math.random() * this.months.length);
  random_string = this.months[this.random]
  constructor() { }

  ngOnInit(): void {
  }

}
