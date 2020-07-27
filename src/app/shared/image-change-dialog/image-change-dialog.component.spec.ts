import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChangeDialogComponent } from './image-change-dialog.component';

describe('ImageChangeDialogComponent', () => {
  let component: ImageChangeDialogComponent;
  let fixture: ComponentFixture<ImageChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageChangeDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
