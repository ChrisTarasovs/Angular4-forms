import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

@Component({

  selector: 'home', 
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

public section1 = 'assets/img/prod1.jpg';
public section2 = 'assets/img/prod2.jpg';
public section3 = 'assets/img/prod3.jpg';
public section4 = 'assets/img/prod4.jpg';
public section5 = 'assets/img/prod5.jpg';
public section6 = 'assets/img/prod6.jpg';
public section7 = 'assets/img/prod7.jpg';
public section8 = 'assets/img/prod8.jpg';

  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
