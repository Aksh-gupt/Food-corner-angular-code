export class AddressModel{
    constructor(public name:String, public pincode:Number, public address:String){
        this.name = name;
        this.pincode = pincode;
        this.address = address;
    }
}