import { Component, OnInit, OnChanges } from '@angular/core';
import { AllIngredient } from '../../recipepage/allingredient.model';
import { Subscription } from 'rxjs/Subscription';
import { CheckoutService } from '../checkout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnChanges {
  subscription: Subscription;
  empty:Boolean = true;
  ingredients: AllIngredient[] = [];

  constructor(private checkoutService: CheckoutService, 
              private router:Router,
              private route: ActivatedRoute ) {
                
               }

  ngOnInit() {
    this.subscription = this.checkoutService.changeIngredient.subscribe(
      (ingredients: AllIngredient[]) => {
        this.ingredients = ingredients;
        if(this.ingredients !== []){
          this.empty = false;
        }
        // console.log('subscribe is working');
      }
    );
    this.ingredients = this.checkoutService.callItem();
    if(this.ingredients !== []){
      this.empty = false;
    }

    //  THIS IS NOT WORKING I NEED TO FIND OUT WHY??????????????????????
    // this.checkoutService.updateCart.subscribe(
    //   (ingre: AllIngredient[]) => {
    //     this.router.navigate(['./']);
    //     console.log("send4");
    //     console.log(ingre);
    //     // this.ingredients.concat(ingre);

    //   }
    // );
  }

  ngOnChanges(){
    this.ingredients = this.checkoutService.callItem();
    if(this.ingredients !== []){
      this.empty = false;
    }
  }

  removeIngredient(index){
    if(this.ingredients.length === 1){
      this.empty = true;
    }
    this.checkoutService.deleteItem(index);
  }

  placeOrder(){
    if(document.cookie.length != 0){
      var arr = document.cookie.split("=");
      if(arr[0] === "access_token"){
        this.router.navigate(['../order/placeorder'], {relativeTo: this.route});
      }
      else{
        this.router.navigate(['/signin']);
      }
    }
  }

  decreaseAmount(index){
    if(this.ingredients[index].count > 1){
      const count = this.ingredients[index].count - 1;
      this.checkoutService.ChangeItem(index, count);
    }
    else{
      alert("Can't decrease less than one.If you want to remove it click on remove");
    }
  }

  increaseAmount(index){
    const count = this.ingredients[index].count + 1;
    this.checkoutService.ChangeItem(index, count);
  }
}
