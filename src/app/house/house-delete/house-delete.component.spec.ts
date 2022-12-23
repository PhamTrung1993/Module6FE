import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDeleteComponent } from './house-delete.component';

describe('HouseDeleteComponent', () => {
  let component: HouseDeleteComponent;
  let fixture: ComponentFixture<HouseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
