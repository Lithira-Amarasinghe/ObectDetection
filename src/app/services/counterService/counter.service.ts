import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {

  constructor() { }

  private _counter:number=0;

  increment(){
    this._counter++;
  }

  decrement(){
    this._counter--;
  }

  get counter():number{
    return this._counter
  }
}
