import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsAlimentosPage } from './subs-alimentos.page';

describe('SubsAlimentosPage', () => {
  let component: SubsAlimentosPage;
  let fixture: ComponentFixture<SubsAlimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsAlimentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsAlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
