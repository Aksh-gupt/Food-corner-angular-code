import { Component, OnInit } from '@angular/core';
import { AllIngredient } from '../recipepage/allingredient.model';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    // this.checkoutService.changeIngredient.subscribe(
    //   (ingredients: AllIngredient[]) => {
        
    //     console.log('subscribe is working');
    //   }
    // );

  //   window.onload = () => {
  //     if(document.cookie.length != 0){
  //     var newValueArray = document.cookie.split("=");
  //     console.log(newValueArray[1]);
  //   }
  // }
  }
  ingredients = [
    {
      name: 'buns is a top and bottom ingredient of burger it is a type of bread and very thick and soft',
      amount: '2'
    },{
      name: 'cheese',
      amount: '5'
    },{
      name: 'paneer',
      amount: '2'
    },{
      name: 'tikki',
      amount: '1'
    },{
      name: 'buns',
      amount: '2'
    },{
      name: 'cheese',
      amount: '5'
    },{
      name: 'paneer',
      amount: '2'
    },{
      name: 'tikki',
      amount: '1'
    }
  ];

}
