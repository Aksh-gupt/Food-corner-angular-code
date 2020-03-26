import { Component, OnInit, OnDestroy } from '@angular/core';
import { LikeServing } from './like.serving';
import { LikeModel } from './like.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit, OnDestroy {
  LikeArray: LikeModel[];
  subscription: Subscription;

  constructor(private likeServing:LikeServing) { }

  ngOnInit() {
    this.LikeArray = this.likeServing.callItem();
    // console.log("start")
    this.subscription = this.likeServing.LikeChange.subscribe(
      (likes: LikeModel[]) => {
        // console.log("running");
        this.LikeArray = likes;
      },
      (error) => {console.log(error)}
    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  removeLike(index){
    this.likeServing.removeLike(this.LikeArray[index].idrecipe)
  }

}
