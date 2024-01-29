import {Component, Inject} from '@angular/core';
import {CounterService} from "../services/counterService/counter.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  electronics = [
    {id:'001', name: 'iPhone 15' , price: '$ 800'},
    {id:'002', name: 'SAMSUNG S24' , price: '$ 700'},
    {id:'003', name: 'Dell inspiron' , price: '$ 900'},
    {id:'004', name: 'ROG laptop' , price: '$ 1500'},
  ]

  clothing: any = [
    {id:'005', name: 'T-shirt' , price: '$ 35'},
    {id:'006', name: 'Trouser' , price: '$ 40'},
    {id:'007', name: 'Swing short' , price: '$ 25'},
    {id:'008', name: 'Cap' , price: '$ 20'},
  ]

  constructor(@Inject('Counter') public counterService:CounterService) {
  }



}
