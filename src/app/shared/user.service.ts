import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable() 

export class UserService{
    constructor(private http: Http){ }
    registerUser(user: any){
        return this.http.post('http://localhost:3000/users', user);
    }
    logoutUser(token:String){
        const headers = new Headers({'Authorization': `${token}`});
        // headers.append('',);
        return this.http.post('http://localhost:3000/users/logout', 
                '',
                {headers: headers});
    }
    loginUser(user: any){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/users/login', user, {headers: headers});
    }
    readUser(token:String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/users/me', {headers: headers});
    }
    updateUser(token:String,user:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.patch('http://localhost:3000/users/update',user,{headers:headers});
    }
    updatePassword(token:String, pass:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.patch('http://localhost:3000/users/update/password',pass,{headers:headers});
    }

    addCart(token:String, ingredients:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/cart/add', ingredients, {headers: headers});
    }

    readCart(token:String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/cart/read',{headers: headers});
    }

    addAddress(token:String, address:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/users/address', address, {headers: headers});
    }
 
    readAddress(token:String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/users/address/read',{headers: headers});
    }

    updateAddress(token:String, address:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/users/address/update', 
                address, 
                {headers: headers});
    }

    deleteAddress(token:String,index){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const ind = {
            index: index
        }
        return this.http.post('http://localhost:3000/users/address/delete',
                ind, 
                {headers: headers});
    }

    getAvatar(token:String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/users/read/avatar', {headers: headers});
    }

    deleteOneCart(token:String,index){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const ind = {
            index: index
        }
        return this.http.post('http://localhost:3000/cart/delete/one', ind, 
                {headers: headers})
    }

    changeCart(token: String,index, count){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const chan = {
            index: index,
            count: count
        }
        return this.http.post('http://localhost:3000/cart/change',chan, {headers: headers});
    }

    addOrder(token: String, OrderModel: any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/order/add', OrderModel, {headers: headers});
    }

    readOrder(token: String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/order/read',{headers: headers});
    }

    deleteAllCart(token:String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.delete('http://localhost:3000/cart/delete', {headers: headers});
    }

    deleteOrder(token: String, index){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const pos = {
            index: index
        }
        return this.http.post('http://localhost:3000/order/delete', pos, {headers: headers});
    }

    addRating(rating:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/rating/submit', rating, {headers: headers});
    }

    readRating(id){
        const headers = new Headers({'Content-Type': 'application/json'}); 
        const rating = {
            idrecipe: id
        }
        return this.http.post('http://localhost:3000/rating/read', rating, {headers: headers});
    }

    saveRatingUser(token:String, rating:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/user/rating', rating, {headers: headers});
    }

    readUserRating(token:String, id){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const ratingId = {
            id: id
        }
        // console.log(ratingId);
        return this.http.post('http://localhost:3000/user/rating/read', ratingId, {headers: headers});
    }
 
    addClick(addRating: any){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/click/add', addRating, {headers: headers});
    }

    readMostClick(){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3000/click/read',{headers: headers});
    }

    addLike(token: String, addLike:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/user/like/add', addLike, {headers: headers});
    }

    removeLike(token: String, idrecipe:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        const remLike = {
            idrecipe : idrecipe
        }
        return this.http.post('http://localhost:3000/user/like/remove', remLike, {headers: headers});
    }

    readLike(token: String){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.get('http://localhost:3000/user/like/read', {headers: headers});
    }

    addRecord(token: String, Month:any){
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`${token}`);
        return this.http.post('http://localhost:3000/month/save', Month, {headers: headers});
    }

    readRecord(){
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3000/month/read',{headers: headers});
    }
}