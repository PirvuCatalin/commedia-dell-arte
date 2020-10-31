import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  @Output() sliderChangedEvent = new EventEmitter<number>();

  sliderChanged(value: number) {
    this.sliderChangedEvent.emit(value);
  }
}


