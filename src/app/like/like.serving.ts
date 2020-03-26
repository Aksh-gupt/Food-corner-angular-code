import { Injectable, EventEmitter } from '@angular/core';
import { LikeModel } from './like.model';
import { UserService } from '../shared/user.service';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class LikeServing{
    LikeChange =  new EventEmitter<LikeModel[]>();
    Likes: LikeModel[] = [];
    AddModel: LikeModel;
    logged: Boolean = false;
    token: String;
    strip;
    tempLike: LikeModel[];
    add = {
        idrecipe : "",
        image_url : "",
        title : ""
    }
    

    constructor(private userServing:UserService){
        if(document.cookie.length != 0){
            var arr = document.cookie.split("=");
            if(arr[0] === "access_token"){
                this.logged = true;
                this.token = 'Bearer '+arr[1];
                this.userServing.readLike(this.token).subscribe(
                    (response) => {
                        this.Likes = response.json().like;
                        this.LikeChange.next(this.Likes);
                        this.callItem();
                        // console.log(this.Likes);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
            }
            else if(arr[0] === "like"){
                if(arr.length > 2){
                    var array = arr[1].split("; ");
                    this.strip = array[0];
                }
                else{
                    this.strip = arr[1];
                    // console.log('one');
                }
                this.Likes = JSON.parse(this.strip);
                this.LikeChange.next(this.Likes);
                this.callItem();
                // console.log("two");
            }
            else if(arr.length > 2){
                this.strip = arr[2];
                this.Likes = JSON.parse(this.strip);
                this.LikeChange.next(this.Likes);
                this.callItem();
            }
        }
    }

    loginUpdate(token){
        this.logged = true;
        this.token = token;
        var arr = document.cookie.split("=");
        if(arr[0] === "like"){
            if(arr.length > 2){
                var array = arr[1].split("; ");
                this.strip = array[0];
                // console.log('one');
            }
            else{
                this.strip = arr[1];
                // console.log('two');
            }
            this.tempLike = JSON.parse(this.strip);
            document.cookie=`like=${this.strip};expires=Mon, 1 Jan 1990 01:00:00 UTC;`
            this.userServing.addLike(token, this.tempLike).subscribe(
                (response) => {
                    // console.log(response.json().like);
                    this.Likes = response.json().like;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                },
                (error) => console.log(error)
            );
        }
        else if(arr.length > 2){
            // console.log('three');
            this.strip = arr[2];
            this.tempLike = JSON.parse(this.strip);
            document.cookie=`like=${this.strip};expires=Mon, 1 Jan 1990 01:00:00 UTC;`
            this.userServing.addLike(token, this.tempLike).subscribe(
                (response) => {
                    // console.log(response.json().like);
                    this.Likes = response.json().like;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                },
                (error) => console.log(error)
            );
        }
        else{
            this.userServing.readLike(token).subscribe(
                (response) => {
                    this.Likes = response.json().like;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                    // console.log(this.Likes);
                },
                (error) => {
                    console.log(error)
                }
            );
        }
        
    }

    loginUpdateLikeOnlyServer(token){
        this.userServing.readLike(token).subscribe(
            (response) => {
                this.Likes = response.json().like;
                this.LikeChange.next(this.Likes);
                this.callItem();
            },
            (error) => {
                console.log(error)
            }
        );
    }

    logoutUpdate(){
        this.logged = false;
        this.Likes = [];
        this.LikeChange.next(this.Likes);
        this.callItem();
    }

    checkLike(idrecipe){
        let flag = 0;
        for(var i=0;i<this.Likes.length;i++){
            if(idrecipe === this.Likes[i].idrecipe){
                flag = 1;
                break;
            }
        }
        if(flag === 1){
            return true;
        }
        else{
            return false;
        }
    }

    addLike(idrecipe, title, image_url){
        this.add.idrecipe = idrecipe;
        this.add.title = title;
        this.add.image_url = image_url;
        this.tempLike = [];
        this.tempLike.push(this.add);
        if(this.logged){
            this.userServing.addLike(this.token, this.tempLike).subscribe(
                response => {
                    // console.log(response);
                    this.Likes = response.json().like;
                    this.LikeChange.next(this.Likes);
                    this.callItem(); 
                    // console.log(this.Likes);
                },
                (error) => console.log(error)
            );
        }
        else{
            if(document.cookie.length != 0){
                var arr = document.cookie.split("=");
                if(arr[0] === "like"){
                    if(arr.length > 2){
                        var array = arr[1].split("; ");
                        this.strip = array[0];
                    }
                    else{
                        this.strip = arr[1];
                    }
                    this.tempLike = [];
                    this.tempLike = JSON.parse(this.strip);
                    this.tempLike.push(this.add);
                    this.Likes = this.tempLike;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                    this.strip = JSON.stringify(this.tempLike);
                    document.cookie = `like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`
                }
                else if(arr.length > 2){
                    this.strip = arr[2];
                    this.tempLike = [];
                    this.tempLike = JSON.parse(this.strip);
                    this.tempLike.push(this.add);
                    this.Likes = this.tempLike;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                    this.strip = JSON.stringify(this.tempLike);
                    document.cookie = `like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`
                }
            }
            else{
                this.tempLike = [];
                this.tempLike.push(this.add);
                this.Likes = this.tempLike;
                this.LikeChange.next(this.Likes);
                this.callItem();
                this.strip = JSON.stringify(this.tempLike);
                document.cookie = `like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            }
        }
        
        
    }

    removeLike(idrecipe){
        if(this.logged){
            this.userServing.removeLike(this.token, idrecipe).subscribe(
                (response) => {
                    // console.log(response);
                    this.Likes = response.json().like;
                    this.LikeChange.next(this.Likes);
                    this.callItem();
                },
                (error) => console.log(error)
            );
        }
        else{
            var arr = document.cookie.split("=");
            if(arr[0] === "like"){
                if(arr.length > 2){
                    var array = arr[1].split("; ");
                    this.strip = array[0];
                }
                else{
                     this.strip = arr[1]
                }
                this.tempLike = JSON.parse(this.strip);
                let index;
                for(var i=0;i<this.tempLike.length;i++){
                    if(idrecipe === this.tempLike[i].idrecipe){
                        index = i;
                        break;
                    }
                }
                this.tempLike.splice(index, 1);
                this.Likes = this.tempLike;
                this.LikeChange.next(this.Likes);
                this.callItem();
                this.strip = JSON.stringify(this.tempLike);
                document.cookie = `like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            }
            else if(arr.length > 2){
                this.strip = arr[2];
                this.tempLike = JSON.parse(this.strip);
                let index;
                for(var i=0;i<this.tempLike.length;i++){
                    if(idrecipe === this.tempLike[i].idrecipe){
                        index = i;
                        break;
                    }
                }
                this.tempLike.splice(index, 1);
                this.Likes = this.tempLike;
                this.LikeChange.next(this.Likes);
                this.callItem();
                this.strip = JSON.stringify(this.tempLike);
                document.cookie = `like=${this.strip};expires=Tue, 1 Dec 2020 01:00:00 UTC;`;
            }
        }
    }

    callItem(){
        return this.Likes;
    }

}