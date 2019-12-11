import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantesPage } from './add-restaurantes.page';

describe('AddRestaurantesPage', () => {
  let component: AddRestaurantesPage;
  let fixture: ComponentFixture<AddRestaurantesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRestaurantesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
