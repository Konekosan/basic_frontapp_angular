import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModaleComponent } from './confirmation-modale.component';

describe('ConfirmationModaleComponent', () => {
  let component: ConfirmationModaleComponent;
  let fixture: ComponentFixture<ConfirmationModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
