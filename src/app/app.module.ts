import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { ProductCategoryComponent } from './product-category/product-category.component';
import {CounterService} from "./services/counterService/counter.service";
import {Counter2Service} from "./services/counter2Service/counter2.service";
import { CameraViewComponent } from './camera-view/camera-view.component';
import { CounterComponent } from './counter/counter.component';
import {TestService} from "./services/testService/test.service";
import {counterFactory} from "./services/counterFactory/counter.factory";

@NgModule({
  declarations: [
    AppComponent,
    CameraViewComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    TestService,
    {provide: 'TITLE', useValue:'Object detection from live camera feed '},
    CounterService

  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
