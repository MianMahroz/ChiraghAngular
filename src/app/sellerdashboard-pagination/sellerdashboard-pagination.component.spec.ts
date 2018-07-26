import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerdashboardPaginationComponent } from './sellerdashboard-pagination.component';

describe('SellerdashboardPaginationComponent', () => {
  let component: SellerdashboardPaginationComponent;
  let fixture: ComponentFixture<SellerdashboardPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerdashboardPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerdashboardPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
