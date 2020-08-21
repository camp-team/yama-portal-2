import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapSmallComponent } from './google-map-small.component';

describe('GoogleMapSmallComponent', () => {
  let component: GoogleMapSmallComponent;
  let fixture: ComponentFixture<GoogleMapSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleMapSmallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
