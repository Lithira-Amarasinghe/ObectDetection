import { Injectable } from '@angular/core';

@Injectable()
export class Counter2Service {

  constructor() { }

  private _counter:number=0;

  increment(){
    this._counter+=2;
  }

  decrement(){
    this._counter-=2;
  }

  get counter():number{
    return this._counter
  }

}
