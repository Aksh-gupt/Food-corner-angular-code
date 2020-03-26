import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  popularCategories = [
    {
      name: 'Pizza',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Vegetarian_pizza.jpg/270px-Vegetarian_pizza.jpg'
    },
    {
      name: 'Cake',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/220px-Pound_layer_cake.jpg'
    },
    {
      name: 'Burger',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Veganburger.jpeg/175px-Veganburger.jpeg'
    },
    {
      name: 'Lasagne',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/250px-Lasagne_-_stonesoup.jpg'
    },
    {
      name: 'Roll',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dimsum_deep_fried_tofu_skin_roll.jpg/120px-Dimsum_deep_fried_tofu_skin_roll.jpg'
    },
    {
      name: 'Paneer',
      imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-zfZc2ycIfwVURoXZEIeiD6RBiBlD0don1LwPFNkVOq91nR7n'
    }
  ];

}
