import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductJenisComponent } from './admin-product-jenis.component';

describe('AdminProductJenisComponent', () => {
  let component: AdminProductJenisComponent;
  let fixture: ComponentFixture<AdminProductJenisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductJenisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductJenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
