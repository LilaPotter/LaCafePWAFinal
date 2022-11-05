import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservalbe:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservalbe = this.foodService.getAllFoodsByTag(params.tag);
      else
        foodsObservalbe = foodService.getAll();

        foodsObservalbe.subscribe((serverFoods) => {
          console.log("🚀 ~ HomeComponent ~ foodsObservalbe.subscribe ~ serverFoods", serverFoods)

          let serverFoodNew:any[] = [];
          serverFoods.map( (objeto:any) => {
            let a = objeto.imageUrl.replace("'", "");
            serverFoodNew.push(a);
          })

          console.log("🚀 ~ HomeComponent ~ serverFoods.map ~ serverFoodNew", serverFoodNew)
/*           let serverFoodNew:any;
           for (let index = 0; index < serverFoods.length; index++) {
            let serverFoodNew = serverFoods[index].imageUrl.replace("\'\'", "");
           } */

          this.foods = serverFoods;
        })
    })
  }

  ngOnInit(): void {
  }

}
