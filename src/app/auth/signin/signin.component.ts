import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { LikeServing } from '../../like/like.serving';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  showPass:Boolean = false;

  constructor(private userService: UserService, private router: Router,
              private authenticationService: AuthenticationService,
              private checkoutService: CheckoutService,
              private likeService: LikeServing ) { }

  ngOnInit() {
  }

  user = {
    email: "", 
    password: ""
  }
  token:String;
  loginUser(form: NgForm){
    const value = form.value;
    this.user.email = value.email;
    this.user.password = value.password;
    this.userService.loginUser(this.user).subscribe(
      (response) => { 
        // console.log(response);
        this.token = response.json().token;
        if(document.cookie.length !== 0){
          // console.log('one');
            this.checkoutService.loginUpdateCart(this.token);
            setTimeout(() => {
              this.likeService.loginUpdate(this.token);
            },300);
        }
        else{
          this.checkoutService.loginUpdateCartOnlyServer(this.token);
          setTimeout(() => {
            this.likeService.loginUpdateLikeOnlyServer(this.token);
          },300);
        }
        setTimeout(() => {
          document.cookie=`access_token=${this.token};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
          this.authenticationService.loggingin.next(true);
          this.router.navigate(['/']);
        },1000);
        
      },
      (error) => {
        if(error.status === 400){
          alert("Please check your credentials");
        }
        console.log(error.status);
      }
    );
  }

  togglePass(){
    if(this.showPass){
      this.showPass = false;
      const x = document.getElementById("password");
      x.setAttribute('type', 'password');
      document.getElementById("eye").classList.remove("fa-eye-slash");
      document.getElementById("eye").classList.add("fa-eye");
    }
    else{
      this.showPass = true;
      const x = document.getElementById("password");
      x.setAttribute('type', 'text');
      document.getElementById("eye").classList.remove("fa-eye");
      document.getElementById("eye").classList.add("fa-eye-slash");
    }
  }

}
