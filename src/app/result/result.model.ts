import { ingredient } from '../shared/ingredient.model';

export class Ingredients{
    public ingredients: ingredient[];
    constructor(ingredients:ingredient[]){
        this.ingredients = ingredients;
    }
}