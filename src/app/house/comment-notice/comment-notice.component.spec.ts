import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentNoticeComponent } from './comment-notice.component';

describe('CommentNoticeComponent', () => {
  let component: CommentNoticeComponent;
  let fixture: ComponentFixture<CommentNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
