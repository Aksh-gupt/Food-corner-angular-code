import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import QueryService from '../shared/query.service';
import { IngredientsService } from './ingredients.service';

@Injectable()

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
    query: string;

    constructor(private route:ActivatedRoute,
              private ingredientsService: IngredientsService){ }

    ngOnInit(){
        // window.onload = () => {
        //     if(document.cookie.length != 0){
        //     var newValueArray = document.cookie.split("=");
        //     console.log(newValueArray[1]);
        //   }
        // }
      this.query = this.route.snapshot.queryParams['query'];
      this.ingredientsService.getResult(this.query);
      this.route.queryParams.subscribe(
          (params: Params) => {
              this.query = params['query'];
              this.ingredientsService.getResult(this.query);
          }
      );
      
    }

  


  

}
