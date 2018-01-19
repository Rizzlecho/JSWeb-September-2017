import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusedComponent } from './focused.component';

describe('FocusedComponent', () => {
  let component: FocusedComponent;
  let fixture: ComponentFixture<FocusedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
