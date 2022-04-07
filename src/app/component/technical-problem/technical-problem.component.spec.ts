import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalProblemComponent } from './technical-problem.component';

describe('TechnicalProblemComponent', () => {
  let component: TechnicalProblemComponent;
  let fixture: ComponentFixture<TechnicalProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
