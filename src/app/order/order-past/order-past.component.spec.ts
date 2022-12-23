import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPastComponent } from './order-past.component';

describe('OrderPastComponent', () => {
  let component: OrderPastComponent;
  let fixture: ComponentFixture<OrderPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
