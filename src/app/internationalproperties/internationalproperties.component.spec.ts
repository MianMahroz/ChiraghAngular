import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalpropertiesComponent } from './internationalproperties.component';

describe('InternationalpropertiesComponent', () => {
  let component: InternationalpropertiesComponent;
  let fixture: ComponentFixture<InternationalpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
