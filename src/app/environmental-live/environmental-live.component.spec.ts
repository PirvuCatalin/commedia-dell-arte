import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalLiveComponent } from './environmental-live.component';

describe('EnvironmentalLiveComponent', () => {
  let component: EnvironmentalLiveComponent;
  let fixture: ComponentFixture<EnvironmentalLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
