import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("inputName") nameReference : ElementRef;
  @ViewChild("inputAmount") amountReference : ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(){
    const name = this.nameReference.nativeElement.value;
    const amount = this.amountReference.nativeElement.value;
    const ing = new Ingredient(name, amount);

    this.slService.addIngredient(ing);
  }

  onDeleteIngredient(){
    //this.ingredientService.deleteIngredient(this.nameReference.nativeElement.value);
    //this.loggingService.logStatusChanged("delete")
    this.slService.statusRemove.emit(this.nameReference.nativeElement.value);
  }

  onClear(){
    this.nameReference.nativeElement.value = '';
    this.amountReference.nativeElement.value = '0';
  }
}
