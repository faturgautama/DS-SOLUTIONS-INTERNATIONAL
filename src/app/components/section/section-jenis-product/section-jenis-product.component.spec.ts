import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionJenisProductComponent } from './section-jenis-product.component';

describe('SectionJenisProductComponent', () => {
  let component: SectionJenisProductComponent;
  let fixture: ComponentFixture<SectionJenisProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionJenisProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionJenisProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
