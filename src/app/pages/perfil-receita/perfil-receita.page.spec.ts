import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilReceitaPage } from './perfil-receita.page';

describe('PerfilReceitaPage', () => {
  let component: PerfilReceitaPage;
  let fixture: ComponentFixture<PerfilReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
