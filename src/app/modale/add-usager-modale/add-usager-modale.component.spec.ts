import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsagerModaleComponent } from './add-usager-modale.component';

describe('AddUsagerModaleComponent', () => {
  let component: AddUsagerModaleComponent;
  let fixture: ComponentFixture<AddUsagerModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsagerModaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsagerModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
