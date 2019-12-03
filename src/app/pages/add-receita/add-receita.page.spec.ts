import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceitaPage } from './add-receita.page';

describe('AddReceitaPage', () => {
  let component: AddReceitaPage;
  let fixture: ComponentFixture<AddReceitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReceitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
