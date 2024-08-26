//movie list functionality
//search functionality
//filtering by genres (optional)
//go to specific movie page
//show movie information (cast, title etc)
//show the trailer (optional)

/*const apiKey = "432afef8fb25fc4f25e9cbc1ecb35b3c"
const newUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=`
async function getMovies() {
    try{
const {data: {result},}  = await axios(newUrl+apiKey);
console.log();

    }
    */

    const API_KEY = '432afef8fb25fc4f25e9cbc1ecb35b3c';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    document.addEventListener('DOMContentLoaded', () => {
        loadGenres();
        loadMovies();
    
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', () => {
            searchMovies(searchBar.value);
        });
    
        const showAllButton = document.getElementById('show-all');
        showAllButton.addEventListener('click', () => {
            loadMovies(); // Load all movies
        });
    });
    
    async function loadMovies() {
        try {
            const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error('Ошибка при загрузке фильмов:', error);
        }
    }
    
    async function loadGenres() {
        try {
            const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            const data = await response.json();
            displayGenres(data.genres);
        } catch (error) {
            console.error('Ошибка при загрузке жанров:', error);
        }
    }
    
    function displayGenres(genres) {
        const genreList = document.getElementById('genre-list');
        genreList.innerHTML = '';
        genres.forEach(genre => {
            const genreItem = document.createElement('div');
            genreItem.textContent = genre.name;
            genreItem.classList.add('genre-item');
            genreItem.addEventListener('click', () => filterByGenre(genre.id));
            genreList.appendChild(genreItem);
        });
    }
    
    function displayMovies(movies) {
        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
    
            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            moviePoster.alt = movie.title;
            moviePoster.style.width = '150px';
    
            const movieTitle = document.createElement('p');
            movieTitle.textContent = movie.title;
    
            // Кнопка для отображения деталей фильма
            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие события
                window.location.href = `detailfims.html`; // Перенаправление на страницу с деталями фильма
            });
    
            movieItem.appendChild(moviePoster);
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(detailsButton);
            movieItem.addEventListener('click', () => {
                window.location.href = `detailfims.html`; // Перенаправление на страницу с деталями фильма
            });
            movieList.appendChild(movieItem);
        });
    }
    
    function searchMovies(query) {
        const movies = Array.from(document.getElementsByClassName('movie-item'));
        movies.forEach(movie => {
            const title = movie.querySelector('p').textContent.toLowerCase();
            if (title.includes(query.toLowerCase())) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    }
    
    async function filterByGenre(genreId) {
        try {
            const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error('Ошибка при фильтрации по жанру:', error);
        }
    }