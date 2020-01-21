import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserStateComponent } from './chat-user-state.component';

describe('ChatUserStateComponent', () => {
  let component: ChatUserStateComponent;
  let fixture: ComponentFixture<ChatUserStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
