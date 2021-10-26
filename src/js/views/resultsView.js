import View from './View.js';
import icons from '../../img/icons.svg';
class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipes found for your search`;
  _message = '';
  _generateMarkup() {
    const test = this._data.map(this._generateMarkupPreview).join('');
    return test;
  }
  _generateMarkupPreview(result) {
    const id = window.location.pathname.slice(1);
    return `<li class="preview">
    <a class="preview__link" href="${result.id}">
      <figure class="preview__fig">
        <img src="${result.image}" alt="${result.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}
export default new resultsView();
