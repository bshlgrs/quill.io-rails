var fluxPostStore = {};
 
fluxPostStore.constants = {
  TOGGLE_LIKE: "TOGGLE_LIKE"
};

// fluxIngredientSuggestionsStore.store = Fluxxor.createStore({
//   initialize: function(options) {
//     /* We'll have ingredients */
//     this.ingredients = options.ingredients || [];
//     /* Those ingredients can be updated and deleted */
//     this.bindActions(fluxIngredientSuggestionsStore.constants.UPDATE_INGREDIENT, this.onUpdateIngredient, fluxIngredientSuggestionsStore.constants.DELETE_INGREDIENT, this.onDeleteIngredient);
//   },
//   getState: function() {
//      // If someone asks the store what the ingredients are, show them 
//     return {
//       ingredients: this.ingredients,
//     };
//   },
//   onUpdateIngredient: function(payload) {
//     /* Update the model if an ingredient is renamed */
//     payload.ingredient.item = payload.new_name;
//     this.emit("change")
//   },
//   onDeleteIngredient: function(payload) {
//     /* Update the model if an ingredient is deleted */
//     this.ingredients = this.ingredients.filter(function(ingredient) {
//       return ingredient.id != payload.ingredient.id
//     });
//     this.emit("change");
//   }
// });