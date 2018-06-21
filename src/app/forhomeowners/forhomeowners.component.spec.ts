import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForhomeownersComponent } from './forhomeowners.component';

describe('ForhomeownersComponent', () => {
  let component: ForhomeownersComponent;
  let fixture: ComponentFixture<ForhomeownersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForhomeownersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForhomeownersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
