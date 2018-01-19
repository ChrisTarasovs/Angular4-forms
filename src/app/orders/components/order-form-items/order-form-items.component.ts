import { Component, Input, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order-form-items',
  templateUrl: './order-form-items.component.html',
  styleUrls: ['./order-form-items.component.css']
})
export class OrderFormItemsComponent {
    @Input('item') public itemForm: FormGroup;
    @Input('itemIndex') public itemIndex: number;

  constructor() { }

}
