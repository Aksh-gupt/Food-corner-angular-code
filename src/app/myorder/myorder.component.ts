import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    window.onload = () => {
      if(document.cookie.length != 0){
        var newValueArray = document.cookie.split("=");
        if(newValueArray[0] !== "access_token"){
          alert("please login or register");
          this.router.navigate(['/']);
        }
      }
      else{
        alert("please login or register");
        this.router.navigate(['/']);
      }
    }
  } 
  ingredients1 = [
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
    }
  ];
  ingredients2 = [
    {
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
  ]

}
