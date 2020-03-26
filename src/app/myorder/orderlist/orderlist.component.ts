import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { RecieveorderModel } from '../recieveorder.model';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  constructor(private userService: UserService,private router: Router,private route:ActivatedRoute) { }
  token:String;
  recieveOrder: RecieveorderModel;
  showdata: Boolean = false;
  firstname:String;
  _id:String;

  ngOnInit() {
    var arr = document.cookie.split("=");
    this.token = 'Bearer '+arr[1];
    this.userService.readOrder(this.token).subscribe(
      (response) => {
        if(response.status === 200){
          this.showdata = true;
          // console.log(response.json().order);
          this.recieveOrder = response.json().order;
          // console.log(this.recieveOrder.date);
          // this.recieveOrder.date.toUTCString(); 
          // console.log(this.recieveOrder);
          this.firstname = response.json().firstname;
          this._id = response.json()._id;
        }
        
      }
    );
  }
  cancelOrder(index){
    
    if(confirm("Are you sure you want to cancel this order")){
      this.userService.deleteOrder(this.token, index).subscribe(
        (response) => {
          this.recieveOrder[index].deleted = true;
        },
        (error) => console.log(error)
      );
    }
    
  }
  help(){
    // this.router.navigate([`../../https://akshat-gupta-chat-app.herokuapp.com/chat.html?username=${this.firstname}&room=${this._id}`,{ externalUrl: url }]);
    window.open(`localhost:4000/chat.html?username=${this.firstname}&room=${this._id}`, "_blank");
  }

}
