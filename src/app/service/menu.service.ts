import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class menuService {
   private menuState: boolean = false;
   private menuSubject = new Subject<any>();

   updateMenuState() {
        this.menuSubject.next(!this.menuState);
        this.menuState = !this.menuState;
   }
   getMenuState(): Observable<any> {
        return this.menuSubject.asObservable();
   }
}