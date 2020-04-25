import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuizSettingsComponent } from './update-quiz-settings.component';

describe('UpdateQuizSettingsComponent', () => {
  let component: UpdateQuizSettingsComponent;
  let fixture: ComponentFixture<UpdateQuizSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateQuizSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateQuizSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
