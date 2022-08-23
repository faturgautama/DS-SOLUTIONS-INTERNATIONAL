import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOurPartnerComponent } from './section-our-partner.component';

describe('SectionOurPartnerComponent', () => {
  let component: SectionOurPartnerComponent;
  let fixture: ComponentFixture<SectionOurPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionOurPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOurPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
