import { Ingredient } from '../../shared/ingredient.model';
import { EntityState } from '@ngrx/entity';

export interface State extends EntityState<Ingredient> {
    // ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
