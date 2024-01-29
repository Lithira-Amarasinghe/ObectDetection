import {CounterService} from "../counterService/counter.service";
import {TestService} from "../testService/test.service";
import {Counter2Service} from "../counter2Service/counter2.service";

const factoryFunc = (testService:TestService)=>
  testService.isTested ?  new CounterService(): new Counter2Service();

export const counterFactory = {provide: CounterService, useFactory: factoryFunc
  , deps: [TestService]}
