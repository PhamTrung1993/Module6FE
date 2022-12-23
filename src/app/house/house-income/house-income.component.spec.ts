import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseIncomeComponent } from './house-income.component';

describe('HouseIncomeComponent', () => {
  let component: HouseIncomeComponent;
  let fixture: ComponentFixture<HouseIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
