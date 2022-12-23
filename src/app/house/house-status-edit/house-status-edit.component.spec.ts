import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseStatusEditComponent } from './house-status-edit.component';

describe('HouseStatusEditComponent', () => {
  let component: HouseStatusEditComponent;
  let fixture: ComponentFixture<HouseStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseStatusEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
