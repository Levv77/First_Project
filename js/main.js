import {movieList} from './movieList.js';
import {drawMovie, inputSearch} from './list.js';

const container = document.querySelector('.card-row');
drawMovie(container, movieList);
inputSearch();
