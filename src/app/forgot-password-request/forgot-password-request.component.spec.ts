import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordRequestComponent } from './forgot-password-request.component';

describe('ForgotPasswordRequestComponent', () => {
  let component: ForgotPasswordRequestComponent;
  let fixture: ComponentFixture<ForgotPasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
