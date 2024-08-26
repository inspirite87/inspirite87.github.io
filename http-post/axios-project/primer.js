const API_KEY = '432afef8fb25fc4f25e9cbc1ecb35b3c';
const BASE_URL = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;

document.addEventListener('DOMContentLoaded', () => {
    loadNowPlayingMovies();
    setupSearchFunctionality();
    setupGenreFiltering();
});


async function loadNowPlayingMovies() {
    try {
        const response = await fetch(nowPlayingUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}


function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/placeholder-image.jpg'}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <button onclick="goToMoviePage(${movie.id})">View Details</button>
        `;
        movieList.appendChild(movieItem);
    });
}


function goToMoviePage(movieId) {
    window.location.href = `ex.html?id=${movieId}`;
}


function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            try {
                const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`;
                const response = await fetch(searchUrl);
                if (!response.ok) {
                    throw new Error(`Search failed: ${response.statusText}`);
                }
                const data = await response.json();
                displayMovies(data.results);
            } catch (error) {
                console.error('Error during search:', error);
            }
        } else {
            loadNowPlayingMovies();
        }
    });

    searchInput.addEventListener('input', async (event) => {
        if (event.target.value.trim().length === 0) {
            loadNowPlayingMovies();
        }
    });
}


async function setupGenreFiltering() {
    try {
        const genreUrl = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(genreUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch genres: ${response.statusText}`);
        }
        const data = await response.json();
        const genreList = document.getElementById('genre-list');
        
        data.genres.forEach(genre => {
            const genreItem = document.createElement('option');
            genreItem.value = genre.id;
            genreItem.textContent = genre.name;
            genreList.appendChild(genreItem);
        });

        genreList.addEventListener('change', async (event) => {
            const genreId = event.target.value;
            if (genreId) {
                try {
                    const filteredUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`;
                    const response = await fetch(filteredUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch movies by genre: ${response.statusText}`);
                    }
                    const data = await response.json();
                    displayMovies(data.results);
                } catch (error) {
                    console.error('Error during genre filtering:', error);
                }
            } else {
                loadNowPlayingMovies();
            }
        });
    } catch (error) {
        console.error('Error loading genres:', error);
    }

}
