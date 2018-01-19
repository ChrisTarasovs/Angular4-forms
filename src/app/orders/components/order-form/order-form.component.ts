import {
    ChangeDetectorRef, Component,
    OnInit
} from '@angular/core';
import {
    FormArray,
    FormBuilder, FormGroup,
    Validators
} from '@angular/forms';
const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  public orderForm: FormGroup;
  public submittedForm: any;
  public grandtotal: number;
  public today: any =  Date.now()
  constructor(public _fb: FormBuilder,  private ref: ChangeDetectorRef) {}


  ngOnInit() {
      this.orderForm = this._fb.group({
          reference :  ['', Validators.required],
          dateCreated: [ '',  ],
          items: this._fb.array([]),
          grandtotal: [null],
      });

      this.addItem();
      this.orderForm.get('items').valueChanges.subscribe(values => {
          resolvedPromise.then(() => {
              this.grandtotal = values.reduce((acc, cur) => acc + cur.totalsum, 0)
          });
      })
  }

   initItems() {
      return this._fb.group({
          itemsno: ' ',
          description: ['', Validators.required],
          qty:  ['1'],
          priceperitem: 18.00,
          totalsum: [null],
      });
  }

  public addItem() {
      const control = <FormArray>this.orderForm.controls['items'];
      const itemCtrl = this.initItems();
  }
  public removeItem(i: number) {
      const control = <FormArray>this.orderForm.controls['items'];
      control.removeAt(i);
  }
  public submitOrders(value: Object): void {
      this.submittedForm = this.orderForm.value;
  }

}
