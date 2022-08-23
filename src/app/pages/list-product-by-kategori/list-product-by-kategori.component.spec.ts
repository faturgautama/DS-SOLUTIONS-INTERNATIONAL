import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductByKategoriComponent } from './list-product-by-kategori.component';

describe('ListProductByKategoriComponent', () => {
  let component: ListProductByKategoriComponent;
  let fixture: ComponentFixture<ListProductByKategoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductByKategoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductByKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
