
document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.search__btn').addEventListener('click', fetchData);

});


async function fetchData() {
    const query = document.getElementById('searchInput').value;
    const url = http://www.omdbapi.com/?s=${query}&apikey=dd4916f0;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(data) {

    const wrapper = document.querySelector(".wrapper");
   
   
   
   // Clear previous results
   
   wrapper.innerHTML = "";
   
   
   
   if (data.Search && data.Search.length > 0) {
   
   data.Search.forEach((movie) => {
   
   const movieCard = `
   
    <div class="movie-card">
   
    <img src="${movie.Poster}" alt="Movie Poster" class="movie-poster">
   
    <div class="movie-details">
   
    <h2 class="movie-title">${movie.Title}</h2>
   
    <p class="movie-description">Released: ${movie.Year}</p>
   
    <button class="watch-button">Watch Now</button>
   
    </div>
   
    </div>
   
    `;
   
   wrapper.innerHTML += movieCard;
   
    });
   
    } else {
   
   // Display a message if no results are found
   
   wrapper.innerHTML = <p class="no-results">No movies found. Try another search!</p>;
   
    }
   
   }
   
   