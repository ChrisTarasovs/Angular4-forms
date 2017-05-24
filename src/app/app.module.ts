import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import {NgModule,ApplicationRef} from '@angular/core';
import {  FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { CommonModule }                             from '@angular/common';
import {removeNgStyles, createNewHosts,createInputTransfer} from '@angularclass/hmr';
import {RouterModule, PreloadAllModules} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

/* App is our top level component  */
import { AppComponent }      from './app.component';
import {orderFormComponent} from './orders/order-form.component.ts';
import {orderItemComponent} from './orders/order-item.component.ts';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType }  from './app.service';

import '../styles/styles.scss';
import '../styles/bootstrap.css';
import '../styles/bootstrap-grid.css';
import '../styles/bootstrap-reboot.css';


/* Application wide providers*/
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,orderFormComponent , orderItemComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,  FormsModule, ReactiveFormsModule,
    HttpModule, JsonpModule, ReactiveFormsModule ,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ ENV_PROVIDERS, APP_PROVIDERS 
  ],

})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
