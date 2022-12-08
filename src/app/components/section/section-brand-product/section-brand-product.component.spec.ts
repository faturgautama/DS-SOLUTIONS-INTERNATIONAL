import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBrandProductComponent } from './section-brand-product.component';

describe('SectionBrandProductComponent', () => {
  let component: SectionBrandProductComponent;
  let fixture: ComponentFixture<SectionBrandProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBrandProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBrandProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
