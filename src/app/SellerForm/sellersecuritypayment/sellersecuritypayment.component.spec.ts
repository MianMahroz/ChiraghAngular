import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersecuritypaymentComponent } from './sellersecuritypayment.component';

describe('SellersecuritypaymentComponent', () => {
  let component: SellersecuritypaymentComponent;
  let fixture: ComponentFixture<SellersecuritypaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersecuritypaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersecuritypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
