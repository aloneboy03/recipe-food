import { API_URL } from './config.js';
import { getJson } from './helpers.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    let data = await getJson(API_URL + id);
    const obj = data.data.recipe;
    state.recipe = {
      id: obj.id,
      name: obj.title,
      image: obj.image_url,
      indegridents: obj.ingredients,
      publisher: obj.publisher,
      servings: obj.servings,
      url: obj.source_url,
    };
  } catch (err) {
    throw err;
  }
};
