import { Component, OnInit } from '@angular/core';
import { PopularModel } from '../../shared/popular.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-mostorder',
  templateUrl: './mostorder.component.html',
  styleUrls: ['./mostorder.component.css']
})
export class MostorderComponent implements OnInit {

  constructor(private userService: UserService) { }
  mostClick: PopularModel[];

  ngOnInit() {
    this.userService.readMostClick().subscribe(
      (response) => {
        // console.log(response.json().array);
        let store = response.json().array;
        store.splice(6,2);
        this.mostClick = store;
        // console.log(this.mostClick);
        // this.mostClick = response.json().array;
      },
      (error) => console.log(error)
    );
  } 
  MostMadeToday =  [
    {
      name: 'Beer Can Chicken',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vegetarian_pizza.jpg/270px-Vegetarian_pizza.jpg'
    },
    {
      name: 'Best Steak Marinade in Existence',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/220px-Pound_layer_cake.jpg'
    },
    {
      name: 'Weeknight Crack Slaw',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Veganburger.jpeg/175px-Veganburger.jpeg'
    },
    {
      name: 'Lasagne',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/250px-Lasagne_-_stonesoup.jpg'
    },
    {
      name: 'Roll',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dimsum_deep_fried_tofu_skin_roll.jpg/120px-Dimsum_deep_fried_tofu_skin_roll.jpg'
    },
    {
      name: 'Best Steak Marinade in Existence',
      rating: 4.2,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/220px-Pound_layer_cake.jpg'
    }
  ];

}
