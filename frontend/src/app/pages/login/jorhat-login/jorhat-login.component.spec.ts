import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JorhatLoginComponent } from './jorhat-login.component';

describe('JorhatLoginComponent', () => {
  let component: JorhatLoginComponent;
  let fixture: ComponentFixture<JorhatLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JorhatLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JorhatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
