import { Url } from 'url';
import { AllIngredient } from './allingredient.model';

 export class RecipepageModel{
     constructor(public publisher:string,
                public recipe_id:string,
                public image_url:string,
                public ingredients:AllIngredient[],
                public serving:number,
                public time:number,
                public publisher_url: Url,
                public title: string,
            public social_rank: number,
                public source_url:Url ){
        
        this.publisher = publisher;
        this.recipe_id = recipe_id;
        this.image_url = image_url;
        this.ingredients = ingredients;
        this.serving = serving;
        this.time = time;
        this.publisher_url = publisher_url;
        this.title = title;
        this.source_url = source_url;
    }
 }  