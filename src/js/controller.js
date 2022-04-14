import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////

let rendor = async function () {
  try {
    const id = window.location.hash.slice(1);

    recipeView.spinner();
    // await model.loadRecipe(id);
    await model.loadRecipe(id);
    // console.log(race);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorNotify();
  }
};

searchView.addHandleEvent(searchView.getValue);

recipeView.addHandleEvent(rendor);
