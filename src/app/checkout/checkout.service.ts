import { Subject } from 'rxjs/Subject';
import { AllIngredient } from '../recipepage/allingredient.model';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../shared/user.service';

@Injectable()

export class CheckoutService implements OnInit{
    changeIngredient = new EventEmitter<AllIngredient[]>();
    ingredients: AllIngredient[] = [];
    logged:Boolean;

    constructor(private userService: UserService) {
        // console.log('faf');
        if(document.cookie.length !== 0){
            var arr = document.cookie.split("=");
            if(arr[0] !== "access_token"){
                if(arr[0] === "cart"){
                    if(arr.length > 1){
                        var array = arr[1].split("; ");
                        this.ingredients = JSON.parse(array[0]);
                    }
                    else{
                        this.ingredients = JSON.parse(arr[1]);
                    }
                    // console.log(this.ingredients);
                    this.changeIngredient.next(this.ingredients);
                    this.callItem();
                    this.logged = false;
                }
                else if(arr.length > 2){
                    this.ingredients = JSON.parse(arr[2]);
                    // console.log(this.ingredients);
                    this.changeIngredient.next(this.ingredients);
                    this.callItem();
                    this.logged = false;
                }
            }
            else{
                const token = 'Bearer '+ arr[1];
                this.logged = true;
                this.userService.readCart(token).subscribe(
                    (response) => {
                        if(response.status === 204){

                        }
                        else{
                            const store = response.json().ingredients;
                            for(var i=0;i<store.length;i++){
                                delete store[i]._id;
                            }
                            // console.log('hi');
                            this.ingredients = store;
                            // console.log(this.ingredients);
                            this.changeIngredient.next(this.ingredients);
                            //this.callItem();
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                
            }
        }
    }
    
    ngOnInit(){
        
    }

    updateCart = new Subject<any>();
    
    strip:string;
    ingre: AllIngredient[] = [];

    callUpdateCart(ingre: AllIngredient[]){
        if(confirm("All Ingredients added to cart")){
        if(document.cookie.length !== 0){
            var arr = document.cookie.split("=");
            // console.log("running cookie");
            if(arr[0] !== "access_token"){
                if(arr[0] === "cart"){
                    if(arr.length > 2){
                        var array = arr[1].split("; ");
                        this.ingre = JSON.parse(array[0]);
                    }
                    else{
                        this.ingre = JSON.parse(arr[1]);
                    }
                    this.ingre.push(...ingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    // console.log(this.ingredients);
                    this.callItem();
                }
                else if(arr.length > 2){
                    this.ingre = JSON.parse(arr[2]);
                    this.ingre.push(...ingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    // console.log(this.ingredients);
                    this.callItem();
                }
                else{
                    this.ingre = [];
                    this.ingre.push(...ingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    // console.log(this.ingredients);
                    this.callItem();
                }
            }
            else{
                this.ingre = [];

                this.ingre.push(...ingre);
                const token = 'Bearer '+ arr[1];
                // console.log("running database");
                this.userService.addCart(token,this.ingre).subscribe(
                    (response) => {
                        // console.log(response);
                        this.userService.readCart(token).subscribe(
                            (response) => {
                                this.ingredients = response.json().ingredients;
                                
                                this.callItem();
                            },
                            error => console.log(error)
                        );
                    },
                    (error) => console.log(error)
                );
            }
        }
        else{
            this.ingre = [];
            this.ingre.push(...ingre);
            this.strip = JSON.stringify(this.ingre);
            document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            this.ingredients = this.ingre;
            // console.log(this.ingredients);
            this.callItem();
        }
    }
        
        // alert('item added to cart');
    }

    loginUpdateCart(token){
        const oritoken = 'Bearer ' + token;
        this.logged = true;
        var arr = document.cookie.split("=");
        if(arr[0] === "cart"){
            if(arr.length > 2){
                var array = arr[1].split("; ");
                this.ingre = JSON.parse(array[0]);
            }
            else{
                this.ingre = JSON.parse(arr[1]);
            }
            document.cookie=`cart=${token};expires=Mon, 1 Jan 1990 01:00:00 UTC;`;
            // console.log(this.ingre);
            if(this.ingre !== []){
                this.userService.addCart(oritoken,this.ingre).subscribe(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
        else if(arr.length > 2){
            this.ingre = JSON.parse(arr[2]);
            document.cookie=`cart=${token};expires=Mon, 1 Jan 1990 01:00:00 UTC;`;
            // console.log(this.ingre);
            if(this.ingre !== []){
                this.userService.addCart(oritoken,this.ingre).subscribe(
                    (response) => {
                        // console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
        setTimeout(()=>{
            this.userService.readCart(oritoken).subscribe(
                (response) => {
                    this.ingredients = response.json().ingredients;
                    this.callItem();
                },
                error => console.log(error)
            );
        },200);
    }
    loginUpdateCartOnlyServer(token){
        const oritoken = 'Bearer '+token;
        this.logged = true;
        this.userService.readCart(oritoken).subscribe(
            (response) => {
                if(response.status === 200){
                    this.ingredients = response.json().ingredients;
                    this.changeIngredient.next(this.ingredients);
                }
            },
            (error) => console.log(error)
        ); 
    }

    logoutUserCartUpdate(){
        this.logged = false;
        this.ingredients = [];
        this.callItem();
    }
    
    callItem(){
        // console.log('calling');
        return this.ingredients.slice();
    }

    deleteItem(index){
        if(this.logged === true){
            var arr = document.cookie.split("=");
            const tokenbea = 'Bearer '+arr[1];
            this.userService.deleteOneCart(tokenbea,index).subscribe(
                (response) => {
                    // console.log(response);
                    this.ingredients = response.json().ingredients;
                    this.changeIngredient.next(this.ingredients);
                },
                (error) => {
                    console.log(error)
                }
            );
        }
        else{
            var arr = document.cookie.split("=");
            if(arr[0] === "cart"){
                if(arr.length > 2){
                    var array = arr[1].split("; ");
                    this.strip = array[0];
                }
                else{
                    this.strip = arr[1];
                }
            }
            else if(arr.length > 2){
                this.strip = arr[2];
            }
            
            this.ingre = JSON.parse(this.strip);
            
            this.ingre.splice(index,1);
            this.strip = JSON.stringify(this.ingre);
            document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            // console.log(this.ingre);
            this.ingredients = this.ingre;
            this.changeIngredient.next(this.ingredients);
        }
    }

    ChangeItem(index, count){
        if(this.logged === true){
            var arr = document.cookie.split("=");
            const tokenbea = 'Bearer '+arr[1];
            this.userService.changeCart(tokenbea,index,count).subscribe(
                (response) => {
                    // console.log(response);
                    this.ingredients[index].count = count;
                    this.changeIngredient.next(this.ingredients);
                },
                (error) => {
                    console.log(error)
                }
            );
        }
        else{
            var arr = document.cookie.split("=");
            if(arr[0] === "cart"){
                if(arr.length > 2){
                    var array = arr[1].split("; ");
                    this.strip = array[0];
                }
                else{
                    this.strip = arr[1];
                }
            }
            else if(arr.length > 2){
                this.strip = arr[2];
            }
            
            this.ingre = JSON.parse(this.strip);
            
            this.ingre[index].count = count;
            this.strip = JSON.stringify(this.ingre);
            document.cookie=`cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            // console.log(this.ingre);
            this.ingredients = this.ingre;
            this.changeIngredient.next(this.ingredients);
        }
    }

    tempingre:AllIngredient = {
        ingredient: "",
        count: 0,
        unit: ""
    }

    addOneElement(ingredient, amount,unit=""){
        const ingredients = [{
            ingredient: ingredient,
            count: amount,
            unit: unit
        }];
        if(this.logged){
            var arr = document.cookie.split("=");
            const tokenbea = 'Bearer '+arr[1];
            this.userService.addCart(tokenbea,ingredients).subscribe(
                (response) => {
                    // console.log(response);
                    this.ingredients = response.json().ingredients;
                    this.changeIngredient.next(this.ingredients);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        else{
            if(document.cookie.length != 0){
                var arr = document.cookie.split("=");
                if(arr[0] === "cart"){
                    if(arr.length > 2){
                        var array = arr[1].split("; ");
                        this.strip = array[0];
                    }
                    else{
                        this.strip = arr[1];
                    }
                    this.ingre = JSON.parse(this.strip);
                    this.tempingre.count = amount;
                    this.tempingre.unit = unit;
                    this.tempingre.ingredient = ingredient;
                    this.ingre.push(this.tempingre);
                    // console.log(this.ingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie = `cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    this.changeIngredient.next(this.ingredients);
                }
                else if(arr.length > 2){
                    this.strip = arr[2];
                    this.ingre = JSON.parse(this.strip);
                    this.tempingre.count = amount;
                    this.tempingre.unit = unit;
                    this.tempingre.ingredient = ingredient;
                    this.ingre.push(this.tempingre);
                    // console.log(this.ingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie = `cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    this.changeIngredient.next(this.ingredients);
                }
                else{
                    this.tempingre.count = amount;
                    this.tempingre.unit = unit;
                    this.tempingre.ingredient = ingredient;
                    this.ingre = []; 
                    this.ingre.push(this.tempingre);
                    this.strip = JSON.stringify(this.ingre);
                    document.cookie = `cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                    this.ingredients = this.ingre;
                    this.changeIngredient.next(this.ingredients);
                }
            }
            else{
                this.tempingre.count = amount;
                this.tempingre.unit = unit;
                this.tempingre.ingredient = ingredient;
                this.ingre = [];
                this.ingre.push(this.tempingre);
                this.strip = JSON.stringify(this.ingre);
                document.cookie = `cart=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
                this.ingredients = this.ingre;
                this.changeIngredient.next(this.ingredients);
            }
        }
    }

    emptyCart(){
        this.ingredients = [];
        this.changeIngredient.next(this.ingredients);
    }
}