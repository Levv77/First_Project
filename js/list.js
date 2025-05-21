import { movieList } from "./movieList.js";

// HTML만 만들어주는 함수
// 부모노드를 직접 return에 넣으면 오류 발생하기 때문에 부모노드 직전까지만 만듦
export function drawHTML() {
  const divCol = document.createElement('div');
  const aCard = document.createElement('a');
  const divCard = document.createElement('div');
  const imgCard = document.createElement('img');
  const divCardHeader = document.createElement('div');
  const divCardBody = document.createElement('div');
  const pCardText = document.createElement('p');

  pCardText.classList.add('card-text');
  divCardBody.classList.add('card-body');
  divCardHeader.classList.add('card-header');
  imgCard.classList.add('card-img-top');
  aCard.classList.add('link-light', 'link-offset-2', 'link-underline-opacity-0');
  divCard.classList.add('card', 'border-dark', 'text-center');
  divCol.classList.add('col-3', 'mb-3');

  // 하위요소부터 넣으면서 상위요소로 올라가는 순서로 작성
  divCardBody.appendChild(pCardText);
  aCard.appendChild(imgCard);
  aCard.appendChild(divCardHeader);
  divCard.appendChild(aCard);
  divCard.appendChild(divCardBody);
  divCol.appendChild(divCard);

  return divCol;
}
// 받아온 객체에서 키와 값을 이용해서 요소의 값 설정하는 함수
export function insertMovie(htmlElement, movie) { 
  const posterBasePath = "https://image.tmdb.org/t/p/w440_and_h660_face";
  const cardUrl = './movie.html?id='
  const aCard = htmlElement.querySelector('a');
  const imgCard = htmlElement.querySelector('img');
  const titleCard = htmlElement.querySelector('.card-header');
  const textCard = htmlElement.querySelector('.card-text');

  imgCard.src = posterBasePath + movie.poster_path;
  imgCard.alt = `${movie.title} 포스터`;

  aCard.href = cardUrl + movie.id;

  titleCard.textContent = movie.title;
  textCard.textContent = movie.release_date;
}
// 반복문을 사용해서 HTML 카드를 생성하고 부모노드에 추가하고 값을 각각의 요소에 설정해주는 함수
export function drawMovie(container, movieList) {
  container.innerHTML = "";
  for(let i=0; i<movieList.results.length; i++) {
    const card = drawHTML();
    const movie = movieList.results[i];
    // console.log(movie.poster_path);
    insertMovie(card, movie);
    // console.log(card);
    container.appendChild(card);
  }
}
// -------------------------------------------------------------------------------
function searchMovie(keyword, movies) {
  const container = document.querySelector('.card-row');
  container.innerHTML = "";
  const movieMatch = [];

  for (let i = 0; i < movies.results.length; i++) {
    const movieTitle = movies.results[i];
    const titleMatch = movies.results[i].title.toLowerCase();
    if (titleMatch.includes(keyword)) {
      movieMatch.push(movieTitle);
    }
  }
  if (movieMatch.length > 0) {
    for (let i = 0; i < movieMatch.length; i++) {
      const movieCard = drawHTML();
      insertMovie(movieCard, movieMatch[i]);
      container.appendChild(movieCard);
    } 
  } else {
      container.innerHTML = `<p style="text-align: center;">검색결과가없습니다.</p>`;
  }
}
// input을 입력하면 검색된 데이터를 출력해주는 함수 (이벤트리스너)
export function inputSearch() {
  const inputMovie = document.querySelector('.input-movie');
    inputMovie.addEventListener('input', function() {
    const inputVal = inputMovie.value;
    const inputMatch = inputVal.toLowerCase();
    searchMovie(inputMatch, movieList);
  });
}