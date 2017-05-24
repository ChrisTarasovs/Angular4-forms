
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
//import {FORM_DIRECTIVES, NgForm, FormBuilder, Control, ControlGroup, Validators}  from '@angular/common';



@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,

  template: `

    <order-form></order-form>


  `
})
export class AppComponent implements OnInit {
/*
•         Order Reference: Required field – cannot be blank
•         Date – auto populated with today’s date
•         Item No / Description are freetype (Item No can be auto incremented, not fussed)
•         Qty / Price per each, validation would be nice but can live without
•         Total to be as the formula shows – Qty x Price Per Each
•         Grand Total - sum of ALL Totals above it, like an Excel =SUM(A1:A10)
•         + Add new row, allow adding additional rows
*/




  //subscription: Subscription;

  constructor( public appState: AppState) {}

  public ngOnInit() {}

}

