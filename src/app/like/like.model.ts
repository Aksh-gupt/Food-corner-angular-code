export class LikeModel{
    constructor(public idrecipe: String, public image_url:String,public title:String){
        this.idrecipe = idrecipe;
        this.image_url = image_url;
        this.title = title;
    }
}