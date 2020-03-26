import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  like = [{"ids" : "12343"}, {"ids" : "75743"}, {"ids" : "68436"},{"ids" : "57475"}]
  strip:String;
  ngOnInit() {
    // window.onload = () => {
    //   if(document.cookie.length != 0){
    //   var newValueArray = document.cookie.split("=");
    //   console.log(newValueArray[1]);
    //   }
    // }
    // this.strip = JSON.stringify(this.like);
    // document.cookie=`like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
    // var arr = document.cookie.split("=");
    // for(var i=0;i<arr.length;i++){
    //   if(arr[i] === undefined){}
    //   else{
    //     console.log(arr[i]);
    //   }
      
    // }
  }

}
