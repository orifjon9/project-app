import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Ingredient } from '../../shared/ingredient.model';

export const adapter: EntityAdapter<Ingredient> = createEntityAdapter<Ingredient>({
    sortComparer: false
});

export const {
    selectIds: selectIngredientIds,
    selectAll: selectAllIngredients,
    selectEntities: selectIngredientEntities,
    selectTotal: selectTotalIngredients
} = adapter.getSelectors();
