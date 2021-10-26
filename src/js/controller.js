import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchview from './views/searchview.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
const { title } = require('process');

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('anyone here?');
const controlRecipe = async function () {
  try {
    const id = window.location.pathname.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    //1) loading recipe
    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) rendering recipe
    recipeView.render(model.state.recipe);
    console.log('a7aaaaaaaaa');
  } catch (err) {
    alert(err);
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1)getting search result
    const query = searchview.getQuery();
    if (!query) return;
    //2)load search results
    await model.loadSearchResults(query);
    //3)render search results
    resultsView.render(model.getSearchResultsPage(model.state.search.page));
    //4) render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const paginationControl = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};
const servingControl = function (newServings) {
  //1)render serving
  model.updateServing(newServings);
  //2)render ingredients update
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addhandlerRender(controlRecipe);
  recipeView.addhandlerUpdateServings(servingControl);
  searchview.addhandlerSearch(controlSearchResults);
  paginationView.addhandlerPageClick(paginationControl);
};
init();
