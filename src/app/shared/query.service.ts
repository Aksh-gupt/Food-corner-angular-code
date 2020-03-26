import { Subject } from 'rxjs/Subject';
import { AllIngredient } from '../recipepage/allingredient.model';
import { Injectable } from '../../../node_modules/@angular/core';

Injectable()

export default class QueryService{    
    
    addtoCart = new Subject<AllIngredient[]>();
    
    callCart(ingre: AllIngredient[]){
        this.addtoCart.next(ingre);
        // console.log('akshat');
    }
}