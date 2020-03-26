import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IngredientsService } from '../ingredients.service';
import { ingredient } from '../../shared/ingredient.model';
import { LikeServing } from '../../like/like.serving';

@Component({
  selector: 'app-resultrecipe',
  templateUrl: './resultrecipe.component.html',
  styleUrls: ['./resultrecipe.component.css']
})
export class ResultrecipeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  searchRecipe: ingredient[];
  numeroPerguntas = 30;     
  Liked = new Array(this.numeroPerguntas).fill(false);

  constructor(private ingredientsService: IngredientsService,
            private likeServing: LikeServing ) { }

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
    this.subscription = this.ingredientsService.changedRecipe.subscribe(
      (ingredients: ingredient[]) => {
        // console.log(ingredients);
        for(var i=0;i<ingredients.length;i++){
          ingredients[i].title = this.limitsTitle(ingredients[i].title);
        }
        this.searchRecipe = ingredients;
        setTimeout(()=>{
          for(var i=0;i<this.searchRecipe.length;i++){
            this.Liked[i] = this.likeServing.checkLike(this.searchRecipe[i].recipe_id);
          }
          this.selectInit();
        },1000);
      }
    );
  }

  selectInit(){
    for(var i=0;i<this.Liked.length;i++){
      if(this.Liked[i] === true){
        document.getElementById(`${this.searchRecipe[i].recipe_id}`).setAttribute('fill', '#F00');
      }
    }
  } 

  addLike(index){
    const s = document.getElementById(`${this.searchRecipe[index].recipe_id}`);
    if(this.Liked[index] === false){
      this.Liked[index] = true;
      // console.log('like', this.Liked[index]);
      s.setAttribute("fill","#F00");
      this.likeServing.addLike(this.searchRecipe[index].recipe_id, this.searchRecipe[index].title,
                    this.searchRecipe[index].image_url );
    }
    else{
      this.Liked[index] = false;
      // console.log('unlike', this.Liked[index]);
      s.setAttribute("fill","#DDD");
      this.likeServing.removeLike(this.searchRecipe[index].recipe_id);
    }
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // popularRecipe = [
  //   {
  //     id: 1,
  //     name: 'Pizza',
  //     description: 'This is pizza and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Homemade-Pizza_EXPS_THcom19_376_C02_14_6b.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Cake',
  //     description: 'This is cake and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/carrot-cake.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: 'Burger',
  //     description: 'This is burger and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg'
  //   },
  //   {
  //     id: 4,
  //     name: 'Lasagne',
  //     description: 'This is a Lasagne and very delicious.',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Lasagne_-_stonesoup.jpg'
  //   },
  //   {
  //     id: 5,
  //     name: 'Roll',
  //     description: 'This is a roll and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://recipes.timesofindia.com/photo/53224221.cms'
  //   },
  //   {
  //     id: 6,
  //     name: 'Paneer',
  //     description: 'This is a paneer and very delicious',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/12/shahi-paneer-2.jpg'
  //   },
  //   {
  //     id: 4,
  //     name: 'Burger',
  //     description: 'This is burger and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg'
  //   },
  //   {
  //     id: 8,
  //     name: 'Roll',
  //     description: 'This is a roll and very delicious and tasty',
  //     rating: 4.6,
  //     author: 'surang wala makan',
  //     imagePath: 'https://recipes.timesofindia.com/photo/53224221.cms'
  //   }
  // ];

}
