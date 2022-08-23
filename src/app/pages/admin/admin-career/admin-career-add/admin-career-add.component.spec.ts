import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCareerAddComponent } from './admin-career-add.component';

describe('AdminCareerAddComponent', () => {
  let component: AdminCareerAddComponent;
  let fixture: ComponentFixture<AdminCareerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCareerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCareerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
