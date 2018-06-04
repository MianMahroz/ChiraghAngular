import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoaDetailsComponent } from './poa-details.component';

describe('PoaDetailsComponent', () => {
  let component: PoaDetailsComponent;
  let fixture: ComponentFixture<PoaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
