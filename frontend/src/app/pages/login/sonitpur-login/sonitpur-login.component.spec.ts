import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonitpurLoginComponent } from './sonitpur-login.component';

describe('SonitpurLoginComponent', () => {
  let component: SonitpurLoginComponent;
  let fixture: ComponentFixture<SonitpurLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonitpurLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonitpurLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
