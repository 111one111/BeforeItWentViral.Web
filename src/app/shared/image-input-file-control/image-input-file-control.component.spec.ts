import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputFileControlComponent } from './image-input-file-control.component.ts';

describe('InputControlComponent', () => {
  let component: ImageInputFileControlComponent;
  let fixture: ComponentFixture<ImageInputFileControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInputFileControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputFileControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
