import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvaterComponent } from './user-avater.component';

describe('UserAvaterComponent', () => {
  let component: UserAvaterComponent;
  let fixture: ComponentFixture<UserAvaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserAvaterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
