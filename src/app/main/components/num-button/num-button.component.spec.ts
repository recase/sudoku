import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumButtonComponent } from './num-button.component';

describe('NumButtonComponent', () => {
  let component: NumButtonComponent;
  let fixture: ComponentFixture<NumButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
