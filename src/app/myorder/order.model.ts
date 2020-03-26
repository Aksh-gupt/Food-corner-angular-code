import { AllIngredient } from '../recipepage/allingredient.model';
import { AddressModel } from '../shared/address.model';

 export class OrderModel{
     constructor(public ingredientOrder: AllIngredient[], 
                public address: AddressModel) {
         this.ingredientOrder = ingredientOrder;
         this.address = address;
     }
 }