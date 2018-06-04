import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRentalComponent } from './property-rental.component';

describe('PropertyRentalComponent', () => {
  let component: PropertyRentalComponent;
  let fixture: ComponentFixture<PropertyRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
