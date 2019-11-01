import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPageViewComponent } from './mini-page-view.component';

describe('MiniPageViewComponent', () => {
  let component: MiniPageViewComponent;
  let fixture: ComponentFixture<MiniPageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
