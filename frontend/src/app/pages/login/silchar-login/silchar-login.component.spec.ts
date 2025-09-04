import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilcharLoginComponent } from './silchar-login.component';

describe('SilcharLoginComponent', () => {
  let component: SilcharLoginComponent;
  let fixture: ComponentFixture<SilcharLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilcharLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilcharLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
