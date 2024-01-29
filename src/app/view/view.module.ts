import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import {CounterService} from "../services/counterService/counter.service";


@NgModule({
  declarations: [
    ViewComponent
  ],
  providers:[
    {provide: 'CounterService', useValue: CounterService},
  ],
  imports: [
    CommonModule,
    ViewRoutingModule
  ]
})
export class ViewModule { }
