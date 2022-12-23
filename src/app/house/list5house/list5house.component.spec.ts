import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List5houseComponent } from './list5house.component';

describe('List5houseComponent', () => {
  let component: List5houseComponent;
  let fixture: ComponentFixture<List5houseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ List5houseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List5houseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
