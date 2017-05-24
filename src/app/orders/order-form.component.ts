import {  Component, OnInit, ChangeDetectorRef} from '@angular/core';
// ng2 Control, ControlGroup -> ng4  FormGroup, , FormControl
// ngForm use to be in /common now in forms
import {NgForm, FormBuilder, FormGroup, AbstractControl, FormArray,  FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { orderItemComponent } from './order-item.component'

const resolvedPromise = Promise.resolve(null);

@Component({
  //  moduleId: module.id,
  selector: 'order-form',
 // encapsulation: ViewEncapsulation.None,

  template: `
  

  <div  style="width: 800px ; margin: 0px auto;">
    <h2>Registration Form</h2>
    <form [formGroup]="orderForm" (ngSubmit)="submitOrders(orderForm.value)" novalidate>
   
      <fieldset class="form-group row">
        <label for="reference" class="col-lg-2 col-form-label">Reference No.</label>
        <div class="col-lg-10 col-form-input">
          <input type="number" class="form-control" placeholder="Reference no" formControlName="reference">
          <div class="hasError" *ngIf="!orderForm.controls.reference.valid">
            Reference No. is required.
          </div> 
        </div>
      </fieldset>
      <fieldset class="form-group">
        <label for="date">Date</label>
        <input type="text" readonly class="form-control"  [ngModel]="today | date:'dd MM yyyy'"   formControlName="dateCreated">
        <div  class="hasError" *ngIf="!orderForm.controls.dateCreated.valid">
          Date is required.
        </div> 
      </fieldset>
      <div formArrayName="items" class="form-inline">
          <div *ngFor="let item of orderForm.controls.items.controls; let i=index" >
            <!-- Angular assigns array index as group name by default -->
            <div class="form-list" [formGroupName]="i" >
              <order-item [item]="orderForm.controls.items.controls[i]" [itemIndex]="i"></order-item>
              <button  class="btn btn-primary button-remove" *ngIf="orderForm.controls.items.controls.length > 1" (click)="removeItem(i)">X</button>
            </div>
          </div>
       </div>
       <div class="add-row">
           <button class="btn btn-primary" (click)="addItem()" >+ Add    </button> 
       </div>
      <div class="order-total">
         Grand Total <input type="number" class="form-control" readonly [ngModel]="grandtotal" formControlName="grandtotal" />
      </div>
        <br class="clearfix" />
      <hr />
      <button class='btn btn-primary' type='submit' [disabled]='!orderForm.valid'>Submit Registration Form</button>
    </form>
  </div>

<div>myForm details:-</div>
<pre>Is orderForm valid?: <br>{{orderForm.valid | json}}</pre>
<pre>form value: <br>{{orderForm.value | json}}</pre>
<pre>Submitted Form: {{submittedForm | json}} </pre>


  `
})
export class orderFormComponent implements OnInit {
public orderForm: FormGroup;
public submittedForm: any;
public grandtotal: number;
public today: any =  Date.now()
constructor(public _fb: FormBuilder,  private ref: ChangeDetectorRef) { 


}

ngOnInit(){
    // Form validation
   this.orderForm = this._fb.group({
         reference :  ['', Validators.required],
         dateCreated: [ '',  ],
        //  dateCreated: [ '22/22/2018'  ],
        items: this._fb.array([]),
        grandtotal: [null],
    });

   this.addItem();
 

   // You can subscribe to entire form changes as we using  Form Group.
  // Chekcing if items get updated to run te total cart calc
   this.orderForm.get('items').valueChanges.subscribe(values =>{
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

addItem() {
    const control = <FormArray>this.orderForm.controls['items'];
    console.log('control', control);
    const itemCtrl = this.initItems();
    
    control.push(itemCtrl);
    
    console.log('item controler', itemCtrl);
    /* subscribe to individual item value changes */
   // itemCtrl.valueChanges.subscribe(data => {
 
     // this.updateItemTotals(itemCtrl);
//    })
}


removeItem(i: number) {
    const control = <FormArray>this.orderForm.controls['items'];  
    control.removeAt(i);
}


submitOrders(value: Object): void {
  this.submittedForm = this.orderForm.value
  // call API to save
  // or just console log it out :)
  console.log(value);
}




}