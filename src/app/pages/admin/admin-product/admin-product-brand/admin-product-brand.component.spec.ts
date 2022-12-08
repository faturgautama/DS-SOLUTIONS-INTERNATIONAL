import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductBrandComponent } from './admin-product-brand.component';

describe('AdminProductBrandComponent', () => {
  let component: AdminProductBrandComponent;
  let fixture: ComponentFixture<AdminProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
