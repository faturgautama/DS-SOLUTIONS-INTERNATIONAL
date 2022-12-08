import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductKategoriComponent } from './admin-product-kategori.component';

describe('AdminProductKategoriComponent', () => {
  let component: AdminProductKategoriComponent;
  let fixture: ComponentFixture<AdminProductKategoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductKategoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
