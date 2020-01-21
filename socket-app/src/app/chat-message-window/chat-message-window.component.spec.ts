import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageWindowComponent } from './chat-message-window.component';

describe('ChatMessageWindowComponent', () => {
  let component: ChatMessageWindowComponent;
  let fixture: ComponentFixture<ChatMessageWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
