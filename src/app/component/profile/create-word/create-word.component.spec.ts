import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordComponent } from './create-word.component';

describe('CreateWordComponent', () => {
  let component: CreateWordComponent;
  let fixture: ComponentFixture<CreateWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
