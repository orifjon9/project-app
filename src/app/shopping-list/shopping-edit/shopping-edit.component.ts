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
import * as ShoppingListActions from '../store/shopping-list.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  subscription: Subscription;
  @ViewChild('f') slForm: NgForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(data => {
        if (data.editedIngredient != null) {
          this.editMode = true;
          this.slForm.setValue({ name: data.editedIngredient.name, amount: data.editedIngredient.amount });
        }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onAddOrUpdateIngredient(form: NgForm) {
    const ing = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: ing }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing));
    }

    this.onClear();
  }

  onDeleteIngredient() {
    const name = this.slForm.value.name;
    if (name) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }

    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
}
