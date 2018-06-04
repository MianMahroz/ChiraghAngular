import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFinancialsComponent } from './property-financials.component';

describe('PropertyFinancialsComponent', () => {
  let component: PropertyFinancialsComponent;
  let fixture: ComponentFixture<PropertyFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyFinancialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
