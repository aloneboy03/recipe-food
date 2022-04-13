const { async } = require('regenerator-runtime');

import * as model from './model.js';
import recipeView from './views/recipeView.js';


// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  await model.loadRecipe(id);
  recipeContainer.innerHTML = '';
  recipeView.render(model.state.recipe);
};


["hashchange", "load"].map(val => {
  window.addEventListener(val, showRecipe);
})

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);