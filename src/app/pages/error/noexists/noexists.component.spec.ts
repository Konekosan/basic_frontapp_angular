import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoexistsComponent } from './noexists.component';

describe('NoexistsComponent', () => {
  let component: NoexistsComponent;
  let fixture: ComponentFixture<NoexistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoexistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoexistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
