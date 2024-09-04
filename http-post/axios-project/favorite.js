document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite movies.</p>';
    } else {
        favoritesList.innerHTML = '';
        favorites.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('favorite-item');
            movieItem.innerHTML = `
                <img src="${movie.poster ? `https://image.tmdb.org/t/p/w500${movie.poster}` : 'path/to/placeholder-image.jpg'}" alt="${movie.title}" />
                <h3>${movie.title}</h3>
                <button onclick="removeFavorite(${movie.id})">Remove from Favorites</button>
            `;
            favoritesList.appendChild(movieItem);
        });
    }
}

function removeFavorite(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function goBack() {
    window.location.href = 'primeer.html';
}