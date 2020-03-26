import { AllIngredient } from '../recipepage/allingredient.model';
import { AddressModel } from '../shared/address.model';

 export class RecieveorderModel{
     constructor(public ingredientOrder: AllIngredient[], 
                public address: AddressModel,
                public completed:Boolean,
                public date: Date,
                public _id:String,
                public deleted: Boolean ) {
         this.ingredientOrder = ingredientOrder;
         this.address = address;
         this.completed = completed;
         this.date = date;
         this._id = _id;
         this.deleted = deleted;
     }
 }