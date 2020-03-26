import { RecipepageModel } from './recipepage.model';
import axios from 'axios';
import { key } from '../../config'
import { Subject } from 'rxjs/Subject';
import { AllIngredient } from './allingredient.model';
import { Injectable } from '@angular/core';
import { CheckoutService } from '../checkout/checkout.service';

@Injectable() 

export class RecipepageService{
    showRecipe = new Subject<RecipepageModel>();
    changeCount = new Subject<RecipepageModel>();

    constructor( private checkoutService: CheckoutService ){ }
    
    Recipe: RecipepageModel;
    ingredients: [string];
    async getRecipe(id){ 
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${id}`);
            this.Recipe = res.data.recipe;
            this.ingredients = res.data.recipe.ingredients;
            this.parseIngredient();
            this.calcTime();
            this.Recipe.serving = 4;
            this.showRecipe.next(this.Recipe);

        }catch(error){
            console.log(error);
        }
    }
    calcTime(){
        //  Time taken 
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng/3);
        this.Recipe.time = period*15;
    }
    parseIngredient(){
        const unitsLong = ['tablespoons' ,'tablespoon' ,'ounces' ,'ounce' ,'teaspoons' ,'teaspoon' ,'cups' ,'pounds'];
        const unitsShort = ['tbsp' ,'tbsp' ,'oz' ,'oz' ,'tsp' ,'tsp' ,'cup' ,'pound'];

        const newIngredients = this.ingredients.map((el) => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit , i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            })
            ingredient = ingredient.replace(/ *\([^)]*\) */g,' ');
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            let objIng;
            if(unitIndex > -1){
                const arrCount = arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                }
                else{
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit : arrIng[unitIndex],
                    ingredient : arrIng.slice(unitIndex+1).join(' ')
                }
            }
            else if(parseInt(arrIng[0] , 10)){
                objIng = {
                    count : parseInt(arrIng[0] , 10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            }
            else if(unitIndex === -1){
                objIng = {
                    count : 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        })
        this.Recipe.ingredients = newIngredients;
    }

    callAddCart(ingre: AllIngredient[]){
        this.checkoutService.callUpdateCart(ingre);
        // console.log("send2");
    }

    changeService(addsub){
        for(var i=0;i<this.Recipe.ingredients.length;i++){
            const store = this.Recipe.ingredients[i].count;
            const one = store/this.Recipe.serving;
            if(addsub === "add"){
                this.Recipe.ingredients[i].count += one;
            }
            else{
                this.Recipe.ingredients[i].count -= one;
            }
        }
        if(addsub === "add"){
            this.Recipe.serving++;
        }
        else{
            this.Recipe.serving--;
        }
        this.changeCount.next(this.Recipe);
    }

}