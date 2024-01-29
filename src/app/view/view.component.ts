import {Component, Inject} from '@angular/core';
import {Counter2Service} from "../services/counter2Service/counter2.service";
import {CounterService} from "../services/counterService/counter.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(@Inject('CounterService') public  counterService:CounterService) {
  }
}
