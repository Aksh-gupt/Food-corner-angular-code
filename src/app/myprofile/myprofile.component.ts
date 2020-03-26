import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Http, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AddressModel } from '../shared/address.model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  addnewAddress: Boolean = false;
  numeroPerguntas = 5;
  showAddressBool = new Array(this.numeroPerguntas).fill(false);
  image;
  imageurl;

  addressArray: AddressModel[];
  
  constructor(private router: Router, private userService: UserService,private http:Http) { }
  token:String;

  user = {
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    mobile_number: ""
  }

  selectedFile: File = null;

  ngOnInit() {
    if(document.cookie.length != 0){
    var newValueArray = document.cookie.split("=");
      if(newValueArray[0] === "access_token"){
        this.token = 'Bearer ' + newValueArray[1];
      }
      else if(newValueArray.length > 2){
        const a =  newValueArray.length;
        for(var i =1;i<a-1;i++){
          var array = newValueArray[i].split(";");
          if(array[1] === "access_token"){
            var ar = newValueArray[i+1].split(";");
            this.token = 'Bearer ' + ar[0];
          }
        }
      }
      else{
        alert("please login or register");
        this.router.navigate(['/']);
      }
    }
    else{
      alert("please login or register");
      this.router.navigate(['/']);
    }

    this.userService.readUser(this.token).subscribe(
      (response) => {
        // console.log(response);
        // console.log(response.json());
        this.user.firstname = response.json().firstname;
        this.user.lastname = response.json().lastname;
        this.user.email = response.json().email;
        if(response.json().gender !== undefined && response.json().gender !== ""){
          this.user.gender = response.json().gender;
        }
        if(response.json().mobile_number !== undefined && response.json().mobile_number !== ""){
          this.user.mobile_number = response.json().mobile_number;
        }

        this.addressArray = response.json().addresses;
      },
      (error) => console.log(error)
    );

    // this.userService.getAvatar(this.token).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.image = response.json().image;
    //     this.imageurl = this._arrayBufferToBase64(this.image.data);
    //     this.imageurl = 'data:image/jpeg;base64, '+this.imageurl;
    //     console.log(this.imageurl);
    //     // console.log(this.image);
    //   },
    //   (error) => console.log(error)
    // );
  }

  // _arrayBufferToBase64( buffer ) {
  //   var binary = '';
  //   var bytes = new Uint8Array( buffer );
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //     binary += String.fromCharCode( bytes[ i ] );
  //   }
  //   return window.btoa( binary );
  // }

  onFileSelect(event){
    this.selectedFile = <File>event.target.files[0];
    // console.log(event);
  }
  upload(){
    // console.log('hi');
    const headers = new Headers({'Authorization': `${this.token}`});
    const fd = new FormData();
    fd.append('avatar',this.selectedFile,this.selectedFile.name);
    this.http.post('http://localhost:3000/users/profile/avatar',fd, {headers: headers}).subscribe(
      (response) => console.log(response)
    );
  }

  userdemo = {
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    mobile_number: ""
  }

  updateUser(form:NgForm){
    const value = form.value;
    // console.log(value);
    this.userdemo = this.user;
    // console.log(this.userdemo);
    if(value.firstname !== null && value.firstname !== ""){
      this.userdemo.firstname = value.firstname;
    }
    if(value.lastname !== null && value.lastname !== ""){
      this.userdemo.lastname = value.lastname;
    }
    if(value.email !== null && value.email !== ""){
      this.userdemo.email = value.email;
    } 
    if(value.gender !== null && value.gender !== ""){
      this.userdemo.gender = value.gender;
    }
    if(value.mobile_number !== null && value.mobile_number !== ""){
      this.userdemo.mobile_number = value.mobile_number;
    }
    // console.log(this.userdemo);
    this.userService.updateUser(this.token, this.userdemo).subscribe(
      (response) => {
        // console.log(response);
        this.user = this.userdemo;
        // console.log('updated');
        form.reset();
      },
      (error) => console.log(error)
    );
  }
  pass = {
    password: "",
    newpassword: ""
  }

  changePassword(form:NgForm){
    const value = form.value;
    console.log(value);
    if(value.newpassword !== value.renewpassword){
      alert('Please enter same new password in both column');
    }
    else{
      this.pass.password = value.password;
      this.pass.newpassword = value.newpassword;
      this.userService.updatePassword(this.token, this.pass).subscribe(
        (response) => {
          // console.log(response)
        },
        (error) => console.log(error)
      );
    }
  }

  changenewadd(){
    this.addnewAddress = !this.addnewAddress;
  }

  address = {
    name: "",
    pincode: 0, 
    address: ""
  }
  upAddress = {
    name: "",
    pincode: 0,
    address: "",
    index: 0
  }


  addAddress(form:NgForm){
    const value = form.value;
    this.address.name = value.name;
    this.address.pincode = value.pincode;
    this.address.address = value.address;
    this.userService.addAddress(this.token, this.address).subscribe(
      (response) => {
        console.log(response);
        this.addressArray = response.json().address;
        this.addnewAddress = !this.addnewAddress;
        // for(var i=0;i<5;i++){
        //   this.showAddressBool[i] = false;
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateAddress(form:NgForm, index){
    const value = form.value;
    this.upAddress.name = value.name;
    this.upAddress.pincode = value.pincode;
    this.upAddress.address = value.address;
    this.upAddress.index = index;
    // console.log(this.upAddress.index);
    this.userService.updateAddress(this.token,this.upAddress).subscribe(
      (response) => {
        // console.log(response.json().address);
        this.addressArray = response.json().address;
        this.showAddressBool[index] = !this.showAddressBool[index];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateAddressMode(index){
    const i = index;
    this.showAddressBool[index] = !this.showAddressBool[index];
  }

  deleteAddress(index){
    if(confirm("Are you sure you want to delete this address?")){
      this.userService.deleteAddress(this.token, index).subscribe(
        (response) => {
          this.addressArray = response.json().address;
        },
        error => console.log(error)
      );
    }
  }

}