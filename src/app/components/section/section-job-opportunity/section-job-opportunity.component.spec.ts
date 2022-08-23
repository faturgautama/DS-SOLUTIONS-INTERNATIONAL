import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionJobOpportunityComponent } from './section-job-opportunity.component';

describe('SectionJobOpportunityComponent', () => {
  let component: SectionJobOpportunityComponent;
  let fixture: ComponentFixture<SectionJobOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionJobOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionJobOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
