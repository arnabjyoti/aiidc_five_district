import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarpetaLoginComponent } from './barpeta-login.component';

describe('BarpetaLoginComponent', () => {
  let component: BarpetaLoginComponent;
  let fixture: ComponentFixture<BarpetaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarpetaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarpetaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
