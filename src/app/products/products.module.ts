import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {AppModule} from "../app.module";
import {ProductCategoryComponent} from "../product-category/product-category.component";
import {CounterService} from "../services/counterService/counter.service";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCategoryComponent
  ],
  providers:[
    {provide: 'Counter', useExisting :CounterService},
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
    ]
})
export class ProductsModule { }
