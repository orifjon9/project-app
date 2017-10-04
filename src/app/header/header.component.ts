import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingListService} from "../services/shopping-list.service";
import {Ingredient} from "../shared/ingredient.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit{
  numberIngredients: number = 0;
  constructor(private slService: ShoppingListService){}

  ngOnInit(){
    this.slService.ingradientsChanged.subscribe((ingredients: Ingredient[])=> this.numberIngredients = ingredients.length);
  }
}
