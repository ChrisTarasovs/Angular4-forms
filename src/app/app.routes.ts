import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
    Router,
} from '@angular/router';
const ROUTES: Routes = [
    {
        path: '',
        loadChildren: './orders/order.module#OrderModule',
    },
    {
        path: '**', redirectTo: '/'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
