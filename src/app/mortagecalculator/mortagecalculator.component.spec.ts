import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortagecalculatorComponent } from './mortagecalculator.component';

describe('MortagecalculatorComponent', () => {
  let component: MortagecalculatorComponent;
  let fixture: ComponentFixture<MortagecalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortagecalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortagecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
