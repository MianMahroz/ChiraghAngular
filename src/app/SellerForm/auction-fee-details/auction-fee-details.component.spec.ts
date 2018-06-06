import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFeeDetailsComponent } from './auction-fee-details.component';

describe('AuctionFeeDetailsComponent', () => {
  let component: AuctionFeeDetailsComponent;
  let fixture: ComponentFixture<AuctionFeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionFeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
