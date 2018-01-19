import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './containers/order/order.component';
import { OrderFormItemsComponent } from './components/order-form-items/order-form-items.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderRoutingModule } from './order-routing.module';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

const components = [
    OrderComponent,
    OrderFormItemsComponent,
    OrderFormComponent,
]

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      OrderRoutingModule,
  ],
  declarations: [ ...components],
  exports: [...components],
})
export class OrderModule { }
