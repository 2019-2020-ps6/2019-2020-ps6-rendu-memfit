import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteQuizComponent } from './pop-up-delete-quiz.component';

describe('PopUpDeleteQuizComponent', () => {
  let component: PopUpDeleteQuizComponent;
  let fixture: ComponentFixture<PopUpDeleteQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDeleteQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
