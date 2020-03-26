import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
  }
  
  addElement(form:NgForm){
    const value = form.value;
    this.checkoutService.addOneElement(value.ingredient, value.amount);
    form.reset();
  }

}
