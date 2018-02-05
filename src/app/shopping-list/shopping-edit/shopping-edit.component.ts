import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import * as ShoppingListActions from '../../_store/shopping-list.actions';
import * as fromShoppingList from '../../_store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  subscription: Subscription;
  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;

      this.editedItem = this.slService.getIngredient(this.editedItemIndex);
      this.slForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddOrUpdateIngredient(form: NgForm) {
    const ing = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, ingredient: ing }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing));
    }

    this.onClear();
  }

  onDeleteIngredient() {
    const name = this.slForm.value.name;
    if (name) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(name));
    }

    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
}
