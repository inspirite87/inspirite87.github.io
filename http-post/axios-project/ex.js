const API_KEY = '432afef8fb25fc4f25e9cbc1ecb35b3c';
const BASE_URL = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    if (movieId) {
        loadMovieDetails(movieId);
        loadMovieImages(movieId);
        loadMovieTrailer(movieId);
    } else {
        console.error('Movie ID is missing in the URL.');
    }

    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'primeer.html';
        });
    } else {
        console.error('Back button is missing on the page.');
    }
});

async function loadMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) throw new Error(`Failed to fetch movie details: ${response.statusText}`);

        const movie = await response.json();
        if (movie.success === false) throw new Error(`API Error: ${movie.status_message}`);

        document.getElementById('movie-title').textContent = movie.title || 'N/A';
        document.getElementById('movie-poster').src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/placeholder-image.jpg';
        document.getElementById('movie-overview').textContent = movie.overview || 'Overview not available';
        document.getElementById('movie-release-date').textContent = `Release Date: ${movie.release_date || 'Unknown'}`;
        document.getElementById('movie-rating').textContent = `Rating: ${movie.vote_average || 'Not rated'}`;

    } catch (error) {
        console.error('Error loading movie details:', error);
        document.getElementById('movie-info').textContent = 'Error loading movie details. Please try again later.';
    }
}


async function loadMovieImages(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch movie images: ${response.statusText}`);

        const data = await response.json();
        if (data.success === false) throw new Error(`API Error: ${data.status_message}`);

        const imageGallery = document.getElementById('movie-images');
        imageGallery.innerHTML = '';

        if (data.backdrops.length > 0) {
            data.backdrops.forEach(image => {
                if (image.file_path) {
                    const imgElement = document.createElement('img');
                    imgElement.src = `https://image.tmdb.org/t/p/w500${image.file_path}`;
                    imgElement.alt = `Backdrop image from ${document.getElementById('movie-title').textContent}`;
                    imgElement.style.width = '200px';
                    imgElement.style.margin = '5px';
                    imageGallery.appendChild(imgElement);
                }
            });
        } else {
            imageGallery.textContent = 'No images available.';
        }
    } catch (error) {
        console.error('Error loading movie images:', error);
        document.getElementById('movie-images').textContent = 'Error loading movie images. Please try again later.';
    }
}

async function loadMovieTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) throw new Error(`Failed to fetch movie trailer: ${response.statusText}`);

        const data = await response.json();
        if (data.success === false) throw new Error(`API Error: ${data.status_message}`);

        const trailerContainer = document.getElementById('movie-trailer');
        trailerContainer.innerHTML = '';

        const trailer = data.results.find(video => video.type === 'Trailer' && video.key);
        if (trailer) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
            iframe.width = '560';
            iframe.height = '315';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            trailerContainer.appendChild(iframe);
        } else {
            trailerContainer.textContent = 'No trailer available.';
        }
    } catch (error) {
        console.error('Error loading movie trailer:', error);
        document.getElementById('movie-trailer').textContent = 'Error loading movie trailer. Please try again later.';
    }
}