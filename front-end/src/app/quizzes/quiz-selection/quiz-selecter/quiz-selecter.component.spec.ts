import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelecterComponent } from './quiz-selecter.component';

describe('QuizSelecterComponent', () => {
  let component: QuizSelecterComponent;
  let fixture: ComponentFixture<QuizSelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
