import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PopularModel } from '../../shared/popular.model';
import { LikeServing } from '../../like/like.serving';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  constructor(private userService: UserService, private likeServing:LikeServing) { }
  popularRecipe: PopularModel[];
  Liked: Boolean[] = [false,false,false,false,false,false,false,false];
  logged: Boolean = false;
  token: String;
  LikeCookie: Boolean = false;

  limitsTitle(title){
    const newTitle = [];
    if(title.length > 17){
        title.split(' ').reduce((acc,cur) => {
            if(acc <= 17){
                newTitle.push(cur);
            }
            return (acc+cur.length);
        },0)
        return (`${newTitle.join(' ')} ...`);
    }
    return title;
  } 

  ngOnInit() {
    // if(document.cookie.length != 0){
    //   var arr = document.cookie.split("=");
    //   if(arr[0] === "access_token"){
    //     this.token = arr[0];
    //     this.logged = true;
    //   }
    // }

    this.userService.readMostClick().subscribe(
      (response) => {
        // console.log(response.json().array);
        this.popularRecipe = response.json().array;
        for(var i=0;i<this.popularRecipe.length;i++){
          this.popularRecipe[i].title = this.limitsTitle(this.popularRecipe[i].title);
        }
        setTimeout(()=>{
          for(var i=0;i<this.popularRecipe.length;i++){
            this.Liked[i] = this.likeServing.checkLike(this.popularRecipe[i].idrecipe);
          }
          this.selectInit();
        },1000);

      },
      (error) => console.log(error)
    );
        
  }

  selectInit(){
    for(var i=0;i<this.Liked.length;i++){
      if(this.Liked[i] === true){
        document.getElementById(`${this.popularRecipe[i].idrecipe}`).setAttribute('fill', '#F00');
      }
    }
  }

  addLike(index){
    const s = document.getElementById(`${this.popularRecipe[index].idrecipe}`);
    if(this.Liked[index] === false){
      this.Liked[index] = true;
      // console.log('like', this.Liked[index]);
      s.setAttribute("fill","#F00");
      this.likeServing.addLike(this.popularRecipe[index].idrecipe, this.popularRecipe[index].title,
                    this.popularRecipe[index].image_url );
    }
    else{
      this.Liked[index] = false;
      // console.log('unlike', this.Liked[index]);
      s.setAttribute("fill","#DDD");
      this.likeServing.removeLike(this.popularRecipe[index].idrecipe);
    }
    
  }










  popular = [
    {
      id: 1,
      name: 'Pizza',
      rating: 4.6,
      publisher: 'surang wala makan',
      image_url: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Homemade-Pizza_EXPS_THcom19_376_C02_14_6b.jpg'
    },
    {
      id: 2,
      name: 'Cake',
      rating: 4.6,
      publisher: 'surang wala makan',
      image_url: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/carrot-cake.jpg'
    },
    {
      id: 3,
      name: 'Burger',
      rating: 4.6,
      publisher: 'surang wala makan',
      image_url: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg'
    },
    {
      id: 4,
      name: 'Lasagne',
      rating: 4.6,
      publisher: 'surang wala makan',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Lasagne_-_stonesoup.jpg'
    },
    {
      id: 5,
      name: 'Roll',
      rating: 4.6,
      publisher: 'surang wala makan',
      image_url: 'https://recipes.timesofindia.com/photo/53224221.cms'
    }
  ];

}
