import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbuyersComponent } from './forbuyers.component';

describe('ForbuyersComponent', () => {
  let component: ForbuyersComponent;
  let fixture: ComponentFixture<ForbuyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbuyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
