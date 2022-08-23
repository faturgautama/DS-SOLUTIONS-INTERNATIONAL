import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingTypographComponent } from './heading-typograph.component';

describe('HeadingTypographComponent', () => {
  let component: HeadingTypographComponent;
  let fixture: ComponentFixture<HeadingTypographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingTypographComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingTypographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
