  import { Component, OnInit } from '@angular/core';
import { AddressModel } from '../../shared/address.model';
import { UserService } from '../../shared/user.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { OrderModel } from '../order.model';
import { AllIngredient } from '../../recipepage/allingredient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../checkout/checkout.service';

@Component({
  selector: 'app-selectaddress',
  templateUrl: './selectaddress.component.html',
  styleUrls: ['./selectaddress.component.css']
})
export class SelectaddressComponent implements OnInit {
  addnewAddress:Boolean = false;
  addressArray: AddressModel[];
  deliverAddress: AddressModel;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private checkoutService:CheckoutService ) { }

  token:String;
  ingredients: AllIngredient[];

  ngOnInit() {
    var arr = document.cookie.split("=");
    if(arr.length < 3){
      this.token = 'Bearer '+arr[1];
    }
    else{
      for(var i=1;i<arr.length;i++){
        var array = arr[i].split(";");
        if(array[1] === "access_token"){
          var array1 = arr[i+1].split(";");
          this.token = 'Bearer ' + array1[0];
        }
      }
    }
    this.userService.readAddress(this.token).subscribe(
      (response) => {
        // console.log(response.json().address);
        this.addressArray = response.json().address;
      },
      (error) => console.log(error)
    );
    this.userService.readCart(this.token).subscribe(
        (response) => {
          const store = response.json().ingredients;
          for(var i=0;i<store.length;i++){
              delete store[i]._id;
          }
          // console.log('hi');
          this.ingredients = store;
          // console.log(this.ingredients);
                //this.callItem();
        },
        (error) => {
            console.log(error);
        }
    );
  }

  changenewadd(){
    this.addnewAddress = !this.addnewAddress;
  }
  selectAddress(index){
    const sele = document.querySelector('.selectedadd');
    if(sele !== null){
      sele.classList.add('notselectedadd'); 
      sele.classList.remove('selectedadd');
    }
    // console.log(index);
    const lele = document.getElementById(`${index}`);
    if(lele !== null){
      // console.log("this is correct");
      lele.classList.add('selectedadd');
    }
    document.querySelector(`.notsele`).classList.remove('notsele');
    this.deliverAddress = this.addressArray[index];
  }
  address = {
    name: "",
    pincode: 0,
    address: ""
  }

  addAddress(form:NgForm){
    const value = form.value;
    this.address.name = value.name;
    this.address.pincode = value.pincode;
    this.address.address = value.address;
    this.userService.addAddress(this.token, this.address).subscribe(
      (response) => {
        // console.log(response);
        const num = this.addressArray.length;
        this.addressArray = response.json().address;
        this.addnewAddress = !this.addnewAddress;
        setTimeout(() => {
          this.selectAddress(num);
        },500);
      },
      (error) => {
        console.log(error);
      }
    );
  } 

  orderModel: OrderModel;
  Month = {
    month: 0,
    year: 0,
    amount: 0
  }

  placeOrder(){
    if(this.deliverAddress === undefined){
      alert('Please select a address')
    }
    else{
      this.orderModel = {
        ingredientOrder : this.ingredients,
        address : this.deliverAddress
      }
      // console.log(this.orderModel);
      this.userService.addOrder(this.token, this.orderModel).subscribe(
        (response) => {
          // console.log(response);
          this.userService.deleteAllCart(this.token).subscribe(
            (response) => {
              // console.log(response);
              this.checkoutService.emptyCart();
            },
            (error) => console.log(error)
          );
          var d = new Date();
          this.Month.month = d.getMonth();
          this.Month.year = d.getFullYear();
          this.Month.amount = 6999;
          this.userService.addRecord(this.token, this.Month).subscribe(
            (response) => {
              // console.log("this is add record save ", response)
            },(error) => {
              console.log("this is add recode", error);
            }
          );

          this.router.navigate(['../orderplaced'], {relativeTo: this.route});
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  findMonth(x){
    if(x === 1){
      return 'January';
    }
    else if(x === 2){
      return 'Febuary'
    }
    else if(x === 3){
      return 'March'
    }
    else if(x === 4){
      return 'April'
    }
    else if(x === 5){
      return 'May'
    }
    else if(x === 6){
      return 'June'
    }
    else if(x === 7){
      return 'July'
    }
    else if(x === 8){
      return 'August'
    }
    else if(x === 9){
      return 'September'
    }
    else if(x === 10){
      return 'October'
    }
    else if(x ===11){
      return 'November'
    }
    else if(x === 12){
      return 'December'
    }
  }
}
