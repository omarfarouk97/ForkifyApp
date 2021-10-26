import View from './View.js';
import icons from '../../img/icons.svg';
import { RES_PER_PGE } from '../config.js';
class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addhandlerPageClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //console.log(e.target.closest('.btn--inline'));
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RES_PER_PGE);
    //1) 1st page and there is more pages
    if (curPage === 1 && numPages > 1)
      return `<button data-goto ="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
    <span>page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    //2)last page
    if (curPage === numPages && numPages > 1)
      return `<button data-goto ="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>page ${curPage - 1}</span>
  </button>`;
    //3)other page
    if (curPage < numPages)
      return `<button data-goto ="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
     </svg>
     <span>page ${curPage - 1}</span>
   </button>
   <button data-goto ="${
     curPage + 1
   }" class="btn--inline pagination__btn--next">
    <span>page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    //4)there is one page only
    if (curPage === 1) return '';
  }
}
export default new paginationView();
