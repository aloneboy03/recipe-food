import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJson } from './helpers';

// qiymatlarni globalni qilib uzimizdan saqlab olamiz
export const state = {
  recipe: {},
  search: {
    query: ' ',
    data: [],
    results: {},
    page: 1,
    perPege: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(API_URL + id); //getJson fungsiyadidan javob kelishinin kutib turadi(fungsiyani  olib keladi)
    // console.log(data);
    const obj = data.data.recipe;
    // console.log(obj);
    state.recipe = {
      //tepadagi ozgaruvchimizga saqlab oldik
      id: obj.id,
      time: obj.cooking_time,
      publisher: obj.publisher,
      title: obj.title,
      servings: obj.servings,
      source_url: obj.source_url,
      ingredients: obj.ingredients,
      image: obj.image_url,
    };
  } catch (err) {
    throw err;
  }
};

export const searchResult = async function (serachKey) {
  try {
    const data = await getJson(API_URL + `?search=${serachKey}`);
    // console.log(data);
    const getArr = data.data.recipes;

    state.search.query = serachKey; //kop serach qilinadiugan mahsulotlarni topish un

    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        img: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const paginationLogic = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.perPege;
  const end = page * state.search.perPege;

  return state.search.results.slice(start, end);
};
