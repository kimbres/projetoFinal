import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsPage } from './subs.page';

describe('SubsPage', () => {
  let component: SubsPage;
  let fixture: ComponentFixture<SubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
