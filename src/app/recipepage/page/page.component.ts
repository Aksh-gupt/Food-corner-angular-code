import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RecipepageService } from '../recipepage.service';
import { RecipepageModel } from '../recipepage.model';
import { AllIngredient } from '../allingredient.model';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  subscription: Subscription;
  subscrip: Subscription;
  Recipe: RecipepageModel;
  ingredient : AllIngredient[];
  rating;
  logged:Boolean = false;
  token: String; 
  ratingGiven: Boolean = false;
  notratingGiven: Boolean = true;
  availablePincode = [301001, 110058, 110051, 302001, 302005]; 

  recipeRating = {
    idrecipe: "",
    rating: 0
  }
  receiveRating = {
    rating: 0,
    people: 0
  }
  addClick = {
    idrecipe: "",
    title: "",
    image_url: "",
    rating: 0,
    publisher: ""
  }
  addClick1 = {
    idrecipe: "5j335",
    title: "Delicious burger",
    image_url: "https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg",
    rating: "4.7",
    publisher: "Surang wala makan"
  }

  constructor(private recipepageService:RecipepageService, private route: Router,
              private userService: UserService ) { }
 
  ngOnInit() {
    if(document.cookie.length != 0){
      var arr = document.cookie.split("=");
      if(arr[0] === "access_token"){
        this.logged = true;
        this.token = 'Bearer '+arr[1];
      }
      else{
        const s = arr.length;
        for(var i=1;i<s-1;i++){
          var array = arr[i].split(";");
          if(array[1] === "access_token"){
            this.logged = true;
            array = arr[i+1].split(";");
            this.token = 'Bearer '+array[0];
          }
        }
      }
    }

    this.subscription = this.recipepageService.showRecipe.subscribe(

      (recipe: RecipepageModel) => {
        // console.log('hi', recipe);
        this.Recipe = recipe;
        this.userService.readRating(this.Recipe.recipe_id).subscribe(
          (response) => { 
            if(response.status === 204){
              this.receiveRating.rating = 0;
              this.receiveRating.people = 0;
            }
            else{
              let store = response.json().res;
              store.rating = store.rating * 10;
              store.rating = parseInt(store.rating);
              store.rating = store.rating / 10;
              this.receiveRating = store;
            }
            

            this.addClick.idrecipe = this.Recipe.recipe_id;
            this.addClick.publisher = this.Recipe.publisher;
            this.addClick.rating = this.receiveRating.rating;
            this.addClick.title = this.Recipe.title;
            this.addClick.image_url = this.Recipe.image_url;
            this.userService.addClick(this.addClick).subscribe(
              (response) => {
                // console.log(response);
              },
              (error) => console.log(error)
            );
          },
          (error) => console.log(error)
        );
        if(this.logged){
          this.userService.readUserRating(this.token, this.Recipe.recipe_id).subscribe(
            (response) => {
              if(response.status === 200){
                  this.recipeRating = response.json().rat;
                  this.notratingGiven = false;
                  this.ratingGiven = true;
                  // console.log(this.recipeRating.rating, this.recipeRating.idrecipe);
                  setTimeout(() => {
                    this.showInitRating(this.recipeRating.rating);
                    this.giveComment(this.recipeRating.rating, 2);
                  },100);
              }
            },
            (error) => console.log(error)
          );
        }
      }
    );
    
    this.subscrip = this.recipepageService.changeCount.subscribe(
      (recipe: RecipepageModel) => {
        this.Recipe = recipe;
      }
    );


    // this.userService.addClick(this.addClick2).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => console.log(error)
    // );
  }
  ing: AllIngredient[] = [
    {
      count: 1,
      unit: 'f',
      ingredient: "akh"
    },
    {
      count: 0.25,
      unit: 'f',
      ingredient: "fadfad"
    },
    {
      count: 6,
      unit: 'f',
      ingredient: "bncbnc"
    }
  ]; 

  addCart(){
    this.recipepageService.callAddCart(this.Recipe.ingredients);
    // console.log("send1");
  }
  // addCart(){
  //   this.recipepageService.callAddCart(this.ing);
  //   console.log("send1");
  // }

  showInitRating(rating){
    for(var i=1;i<=rating;i++){
      document.getElementById(`two${i}`).classList.remove('fa-star-o');
      document.getElementById(`two${i}`).classList.add('fa-star');
    }
  }

  selectrating(ind){
    for(var i=1;i<=5;i++){
      document.getElementById(`one${i}`).classList.remove('fa-star');
      document.getElementById(`one${i}`).classList.add('fa-star-o');
    }
    for(var i=1;i<=ind;i++){
      document.getElementById(`one${i}`).classList.remove('fa-star-o');
      document.getElementById(`one${i}`).classList.add('fa-star');
    }
    this.rating = ind;
    this.giveComment(ind,1);
  }

  giveComment(ind, select){
    const viewdoc = document.getElementById('view'+select);
    if(ind === 1){
      viewdoc.textContent = "Very bad";
    }
    else if(ind === 2){
      viewdoc.textContent = "Bad";
    }
    else if(ind === 3){
      viewdoc.textContent = "Good";
    }
    else if(ind === 4){
      viewdoc.textContent = "Very Good";
    }
    else if(ind === 5){
      viewdoc.textContent = "Excellent";
    }
  }

  submitrating(){
    if(this.rating === undefined){
      alert("Please select a rating");
    }
    else{
      this.recipeRating.idrecipe = this.Recipe.recipe_id;
      // this.recipeRating.idrecipe = "54437r";
      this.recipeRating.rating = this.rating;
      this.userService.addRating(this.recipeRating).subscribe(
        (response) => {
          // console.log(response)
        }
        ,
        (error) => console.log(error)
      );
      if(this.logged){
        this.userService.saveRatingUser(this.token, this.recipeRating).subscribe(
          (response) => {
            // console.log(response);
            this.notratingGiven = false;
            this.ratingGiven = true;
            setTimeout(() => {
              this.showInitRating(this.recipeRating.rating);
              this.giveComment(this.recipeRating.rating, 2);
              
              this.receiveRating.rating = ((this.receiveRating.rating * this.receiveRating.people) + this.recipeRating.rating)/(this.receiveRating.people+1);
              this.receiveRating.rating *= 10;
              this.receiveRating.rating = Math.trunc(this.receiveRating.rating);
              this.receiveRating.rating /= 10; 
              this.receiveRating.people++;
            },100);
          },
          (error) => console.log(error)
        );
      }
    }
  }

  checkAvail(form: NgForm){
    const value = form.value;
    let flag = 0;
    for(var i=0;i<this.availablePincode.length;i++){
      if(this.availablePincode[i] === value.pincode){
        flag = 1;
        break;
      }
    }
    const avail = document.getElementById('availab');
    if(flag === 0){
      avail.textContent = "Sorry, not available"
    }
    else{
      avail.textContent = "Available"
    }
  }

  changeCount(type){
    this.recipepageService.changeService(type);
  }
}
