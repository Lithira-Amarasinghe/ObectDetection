import {AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
// In your Angular component or service
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import {DetectedObject, ObjectDetectionBaseModel} from '@tensorflow-models/coco-ssd';
import {Router} from "@angular/router";
import {CounterService} from "./services/counterService/counter.service";
import {TestService} from "./services/testService/test.service";
import {Counter2Service} from "./services/counter2Service/counter2.service";

export interface ModelConfig {
  base?: ObjectDetectionBaseModel;
  modelUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'gesture-app';


  constructor(public counterService:CounterService,
    private testService:TestService,
              @Inject('TITLE') public tt: string
              ) {
  }

  ngAfterViewInit(): void {
  }

  increment() {

  }

  decrement() {

  }

  changeTestValue() {
    this.testService.isTested=!this.testService.isTested
    console.log(this.testService.isTested)
  }
}
