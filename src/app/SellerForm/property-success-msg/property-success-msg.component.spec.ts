import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySuccessMsgComponent } from './property-success-msg.component';

describe('PropertySuccessMsgComponent', () => {
  let component: PropertySuccessMsgComponent;
  let fixture: ComponentFixture<PropertySuccessMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySuccessMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySuccessMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
