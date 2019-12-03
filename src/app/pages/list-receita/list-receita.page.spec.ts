import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceitaPage } from './list-receita.page';

describe('ListReceitaPage', () => {
  let component: ListReceitaPage;
  let fixture: ComponentFixture<ListReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
