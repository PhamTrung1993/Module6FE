import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseUpdateStatusComponent } from './house-update-status.component';

describe('HouseUpdateStatusComponent', () => {
  let component: HouseUpdateStatusComponent;
  let fixture: ComponentFixture<HouseUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseUpdateStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
