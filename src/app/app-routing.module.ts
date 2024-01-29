import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CameraViewComponent} from "./camera-view/camera-view.component";

const routes: Routes = [
  { path: 'camera-view', component: CameraViewComponent },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'view', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
