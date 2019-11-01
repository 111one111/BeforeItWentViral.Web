import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationErrorDisplayComponent } from './validation-error-display.component';

describe('ValidationErrorDisplayComponent', () => {
  let component: ValidationErrorDisplayComponent;
  let fixture: ComponentFixture<ValidationErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
