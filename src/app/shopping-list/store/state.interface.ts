import { Ingredient } from '../../shared/ingredient.model';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}
