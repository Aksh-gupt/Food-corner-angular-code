import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipepageService } from './recipepage.service';

@Component({
  selector: 'app-recipepage',
  templateUrl: './recipepage.component.html',
  styleUrls: ['./recipepage.component.css']
})
export class RecipepageComponent implements OnInit {
  id:string;

  constructor(private route: ActivatedRoute, private recipepageService: RecipepageService) { }

  ngOnInit() {
    // window.onload = () => {
    //     if(document.cookie.length != 0){
    //     var newValueArray = document.cookie.split("=");
    //     console.log(newValueArray[1]);
    //   }
    // }
      this.id = this.route.snapshot.queryParams['id'];
      this.recipepageService.getRecipe(this.id);
      // console.log(this.id);
      this.route.queryParams.subscribe(
          (params: Params) => {
              this.id = params['id'];
              this.recipepageService.getRecipe(this.id);
              // console.log(this.id);
          }
      );
      console.log(this.id);
  }
  
  
}
