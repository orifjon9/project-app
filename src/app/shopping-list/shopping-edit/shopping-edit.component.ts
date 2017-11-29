import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../services/shopping-list.service";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(form: NgForm) {
    const ing = new Ingredient(form.value.name, form.value.amount);

    this.slService.addIngredient(ing);
  }

  onDeleteIngredient(form: NgForm) {
    console.log(form.value);
    this.slService.deleteIngredient(form.value.name);
  }

  onClear(form: NgForm) {
    form.reset();
  }
}
