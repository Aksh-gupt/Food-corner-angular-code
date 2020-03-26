export class PopularModel{
    constructor(public idrecipe:String, 
            public title: String, 
            public image_url: String,
            public rating : Number,
            public publisher: String){
        this.idrecipe = idrecipe;
        this.title = title;
        this.image_url = image_url;
        this.rating = rating;
        this.publisher = publisher;
    }
}