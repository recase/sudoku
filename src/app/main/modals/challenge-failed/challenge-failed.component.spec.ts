import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFailedComponent } from './challenge-failed.component';

describe('ChallengeFailedComponent', () => {
  let component: ChallengeFailedComponent;
  let fixture: ComponentFixture<ChallengeFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
