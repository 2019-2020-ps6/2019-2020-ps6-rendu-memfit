import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManagementComponent } from './dialog-management.component';

describe('DialogManagementComponent', () => {
  let component: DialogManagementComponent;
  let fixture: ComponentFixture<DialogManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
