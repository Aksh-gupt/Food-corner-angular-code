import { OnInit} from '@angular/core';
import { Ingredients } from './result.model';
import { key } from '../../config'
import axios from 'axios'
import { Subject } from 'rxjs/Subject';
import { ingredient } from '../shared/ingredient.model';


export class IngredientsService implements OnInit{
    changedRecipe = new Subject<ingredient[]>();
    recipes: ingredient[];

    ngOnInit(){
    }
    async getResult(query){
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
            this.recipes = res.data.recipes;
            this.changedRecipe.next(this.recipes);
            // console.log('hi',this.recipes);
        }
        catch(e){
            console.log(e);
        }
    }
}