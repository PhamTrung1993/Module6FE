import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdteComponent } from './user-updte.component';

describe('UserUpdteComponent', () => {
  let component: UserUpdteComponent;
  let fixture: ComponentFixture<UserUpdteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
