import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientsService } from '../result/ingredients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../shared/authentication.service';
import { CheckoutService } from '../checkout/checkout.service';
import { LikeServing } from '../like/like.serving';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:Boolean = false;
  token:String;
  store:String;

  constructor(private ingredientsService: IngredientsService,
              private route:ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private checkoutService: CheckoutService,
              private likeService: LikeServing ) { }

  ngOnInit() {
      if(document.cookie.length != 0){
        var newValueArray = document.cookie.split("=");
        // for(var i=0;i<newValueArray.length;i++){
        //   console.log(newValueArray[i]+"the family man "+i);
        // }
        var ind = 0;
        var total = newValueArray.length;
        while(ind < total-1){
          if(ind == 0){
            if(newValueArray[0] === "access_token"){
              var fin = newValueArray[1];
              this.logged = true;
              this.token = 'Bearer '+fin;
              console.log(this.token);
            }
          }
          else{
            var semi = newValueArray[ind].split(";");
            if(semi[1] == "access_token"){
              var fina = newValueArray[ind+1].split(";");
              this.logged = true;
              this.token = 'Bearer '+fina[0];
            }
          }
          ind++;
        }
        // if(newValueArray[0] === "access_token"){
        //   this.logged = true;
        //   this.token = 'Bearer '+newValueArray[1];
        //   // console.log(newValueArray[1]);
        // }
      }
    this.authenticationService.loggingin.subscribe(
      (logg: Boolean) => {
        this.logged = logg;
      }
    );
  }

  change(){
    document.getElementById('bs-example-navbar-collapse-1').classList.toggle('collapse');
  }

  searchResult(form: NgForm){
    const value = form.value;
    // this.ingredientsService.getResult(value.query);
    this.router.navigate(['/result'], {queryParams: {query: value.query}} );
  }

  logoutUser(){
    // const auth_token = document.cookie.split("=");
    // const tok = 'Bearer '+ auth_token[1];
    this.userService.logoutUser(this.token).subscribe(
      (response) => {
        document.cookie=`access_token=${this.token};expires=Mon, 1 Jan 1990 01:00:00 UTC;`;
        this.logged = false;
        this.token = "";
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
    );
    this.checkoutService.logoutUserCartUpdate();
    this.likeService.logoutUpdate();
  }
  getProfile(){
    // console.log('hi');
    this.router.navigate(['/account']);
  }
  getCart(){
    this.router.navigate(['/cart']);
  }
  
}
