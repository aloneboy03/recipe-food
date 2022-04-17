const { async } = require('regenerator-runtime');

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.loading(); //modul serverga borib kelguncha loading ishlab turadi

    await model.loadRecipe(id);

    const data = model.state.recipe;
    console.log(data);
    // console.log(data);
    recipeView.render(data); //Moduldan kelgan malumotlarni view ga junatayabmiz

    // console.log(data);
    // console.log(await loadRecipe(id));
  } catch (err) {
    recipeView.renderError();
    throw err; //bu tursa ham buladi turmasa ham buladi
  }
};

// showRecipe();

const searchController = async function () {
  try {
    const inputValue = searchView.getQuery();
    await model.searchResult(inputValue);
    // const data = state.search.results;
    const data = model.paginationLogic();
    paginationView.render(model.state.search); //turgan pagemizni raqamini berdik
    resultsView.render(data);
    // console.log(data);
  } catch (err) {
    alert(err);
  }
};

const paginationController = async function (page) {
  try {
    const data = model.paginationLogic(page);
    paginationView.render(model.state.search);
    resultsView.render(data);
  } catch (err) {
    alert(err);
  }
};

searchView.addHandlerEvent(searchController);
recipeView.addHandlerEvent(showRecipe);
paginationView.addHandlerEvent(paginationController);
