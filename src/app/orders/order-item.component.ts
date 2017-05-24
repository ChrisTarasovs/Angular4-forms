import {  Component,Input, OnInit, ChangeDetectorRef} from '@angular/core';
// ng2 Control, ControlGroup -> ng4  FormGroup, , FormControl
// ngForm use to be in /common now in forms
import {NgForm, FormBuilder, FormGroup, FormArray,  FormControl, Validators} from '@angular/forms'; 

@Component({

  selector: 'order-item',
  template: `

  <div  [formGroup]="itemForm" >
  			<div class="form-grp ">
	          <div>Item No.</div>
	          <input type="text" class="form-control" [ngModel]="itemIndex" formControlName="itemsno">
	          <div *ngIf="itemForm.controls.itemsno.hasError('required')"  class="hasError">Item no is required.</div>
 			</div>
  			<div class="form-grp">
	          <div>Description</div>
	          <input type="text" class="form-control" placeholder="Description" formControlName="description">
	          <div *ngIf="itemForm.controls.description.hasError('required')" class="hasError">Description is required.</div>
 			</div>
			<div class="form-grp">
	          <div>Qty</div>
	          <input  type="number"  class="form-control" placeholder=" " value="1" formControlName="qty">
	          <div *ngIf="itemForm.controls.qty.hasError('required')"  class="hasError">Qty is required.</div>
 			</div>
			<div class="form-grp">
	          <div>Price per item</div>
	          <input  type="number"  class="form-control" placeholder=" "  formControlName="priceperitem">
	          <div *ngIf="itemForm.controls.priceperitem.hasError('required')"  class="hasError">Price per item is required.</div>
 			</div>
     		<div class="form-grp">
	          <div>Total</div>
	          <input type="number" class="form-control" placeholder=" " readonly  [ngModel]="itemForm.get('qty').value * itemForm.get('priceperitem').value"  formControlName="totalsum">
	         
 			</div>
</div>
  `,
  })
export class orderItemComponent implements OnInit {
	 @Input('item') public itemForm: FormGroup;
	 @Input('itemIndex') public itemIndex: number;
	
constructor() { }
ngOnInit(){
	
}


}
 