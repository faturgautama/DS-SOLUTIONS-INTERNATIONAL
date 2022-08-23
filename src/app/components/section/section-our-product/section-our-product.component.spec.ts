import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOurProductComponent } from './section-our-product.component';

describe('SectionOurProductComponent', () => {
  let component: SectionOurProductComponent;
  let fixture: ComponentFixture<SectionOurProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionOurProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOurProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
