import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWhoWeAreComponent } from './section-who-we-are.component';

describe('SectionWhoWeAreComponent', () => {
  let component: SectionWhoWeAreComponent;
  let fixture: ComponentFixture<SectionWhoWeAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionWhoWeAreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionWhoWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
