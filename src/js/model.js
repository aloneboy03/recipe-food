import { async } from 'regenerator-runtime';

export const state = {
    recipe :{},
    
}

export const loadRecipe = async function(id){
    const data = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const dataJSON = await data.json();
      const obj = dataJSON.data.recipe;
    
      state.recipe = {
        id: obj.id,
        name: obj.title,
        image: obj.image_url,
        publisher: obj.publisher,
        ingredients: obj.ingredients,
        servings: obj.servings,
        url: obj.source_url,
        time: obj.cooking_time,
      };

      return state;
}