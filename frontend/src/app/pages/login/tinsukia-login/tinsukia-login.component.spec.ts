import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinsukiaLoginComponent } from './tinsukia-login.component';

describe('TinsukiaLoginComponent', () => {
  let component: TinsukiaLoginComponent;
  let fixture: ComponentFixture<TinsukiaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinsukiaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinsukiaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
