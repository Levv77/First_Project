import { movieList } from "./movieList.js";
import { genres } from './genre.js';
import { drawMovie } from './list.js';

function movieDetail(movie) {
  const posterBasePath = "https://image.tmdb.org/t/p/w440_and_h660_face";
  const movieImg = document.querySelector('.movie-img');
  const movieTitle = document.querySelector('.movie-title');
  const movieOverview = document.querySelector('.movie-overview');
  const movieReleaseDate = document.querySelector('.movie-release');
  const movieAverage = document.querySelector('.movie-average');
  const movieGenre = document.querySelector('.movie-genre');

  movieImg.src = posterBasePath + movie.poster_path;
  movieTitle.textContent = movie.title;
  movieOverview.textContent = movie.overview;
  movieReleaseDate.textContent = movie.release_date;
  movieAverage.textContent = `${(movie.vote_average.toFixed(1))} / 10`;

  // genres에 접근해서 movieList의 id값과 비교 후 값 저장하고 genre 적용
  let genre = ""; // for문 내부에 선언하면 반복 될 때마다 초기화되기 때문에 오류 발생
  for (let i = 0; i < movie.genre_ids.length; i++) {
    const genreId = movie.genre_ids[i];
    for(let j = 0; j < genres.length; j++) {
      if (genreId === genres[j].id) {
        genre += genres[j].name + ' '; // 공백 대신 쉼표로 구분하고 마지막 쉼표 제거해보기
      }
    }
    movieGenre.textContent = genre;
  }
}
// URL의 파라미터 값이 id와 같으면 데이터를 입력해주는 함수
export function insertDetail(movies) {
  const currentUrl = window.location.href;
  const newUrl = new URL(currentUrl);
  const urlParam = newUrl.searchParams;
  const url = Number(urlParam.get('id'));
  const container = document.querySelector('.row-detail');

  for (let i = 0; i < movies.results.length; i++) {
    const movie = movies.results[i];
    if (movie.id === url) { 
      // url값이 string으로 넘어와서 제대로 적용되지 않아서 숫자로 변경 후 적용
      movieDetail(movie);
    } else if (url === 0) {
      // url에 아무것도 없으면 0으로 나옴
      drawMovie(container, movieList);
    }
  }
  console.log(url); 
}
insertDetail(movieList);

// -------------------------------------------------------------------------------