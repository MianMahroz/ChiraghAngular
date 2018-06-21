import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersInvestorsComponent } from './buyers-investors.component';

describe('BuyersInvestorsComponent', () => {
  let component: BuyersInvestorsComponent;
  let fixture: ComponentFixture<BuyersInvestorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyersInvestorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
