import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAreaComponent } from './mail-area.component';

describe('MailAreaComponent', () => {
  let component: MailAreaComponent;
  let fixture: ComponentFixture<MailAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
