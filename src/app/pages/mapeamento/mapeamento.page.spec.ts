import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapeamentoPage } from './mapeamento.page';

describe('MapeamentoPage', () => {
  let component: MapeamentoPage;
  let fixture: ComponentFixture<MapeamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapeamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapeamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
