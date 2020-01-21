import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsersWindowComponent } from './chat-users-window.component';

describe('ChatUsersWindowComponent', () => {
  let component: ChatUsersWindowComponent;
  let fixture: ComponentFixture<ChatUsersWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsersWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
