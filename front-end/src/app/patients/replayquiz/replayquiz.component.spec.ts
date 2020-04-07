import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayquizComponent } from './replayquiz.component';

describe('ReplayquizComponent', () => {
  let component: ReplayquizComponent;
  let fixture: ComponentFixture<ReplayquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
