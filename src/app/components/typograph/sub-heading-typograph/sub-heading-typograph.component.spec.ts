import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeadingTypographComponent } from './sub-heading-typograph.component';

describe('SubHeadingTypographComponent', () => {
  let component: SubHeadingTypographComponent;
  let fixture: ComponentFixture<SubHeadingTypographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHeadingTypographComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeadingTypographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
