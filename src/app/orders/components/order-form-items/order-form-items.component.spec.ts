import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormItemsComponent } from './order-form-items.component';

describe('OrderFormItemsComponent', () => {
  let component: OrderFormItemsComponent;
  let fixture: ComponentFixture<OrderFormItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFormItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
