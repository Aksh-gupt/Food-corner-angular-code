import { Url } from 'url';

export class ingredient{
    constructor(public title:string, 
                public publisher: string,
                public image_url:Url,
                public recipe_id: string,
                public f2f_url: Url,
                public publisher_url: Url,
                public source_url: Url,
                public social_rank: number){
        this.title = title;
        this.publisher = publisher;
        this.image_url = image_url;
        this.recipe_id = recipe_id;
        this.f2f_url = f2f_url;
        this.publisher_url = publisher_url;
        this.source_url = source_url;
        this.social_rank = social_rank;
    }
}