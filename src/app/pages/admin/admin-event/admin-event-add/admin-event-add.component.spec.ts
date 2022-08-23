import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventAddComponent } from './admin-event-add.component';

describe('AdminEventAddComponent', () => {
  let component: AdminEventAddComponent;
  let fixture: ComponentFixture<AdminEventAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
