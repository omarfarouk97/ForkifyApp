import { async } from 'regenerator-runtime';

import { API_URL, RES_PER_PGE } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
};
export const loadRecipe = async function (id) {
  try {
    //1) getting recipe
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cooking: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PGE;
  const end = page * RES_PER_PGE;
  return state.search.results.slice(start, end);
};
export const updateServing = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
