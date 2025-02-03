
let currentPage = 1; // Track the current page
const resultsPerPage = 5; // Number of results to show per page


document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".search__btn").addEventListener("click", fetchData);
   
   });
   
   
   
   async function fetchData() {
   
   const query = document.getElementById("searchInput").value;
   
   const url = `http://www.omdbapi.com/?s=${query}&apikey=dd4916f0 `; // Corrected URL
   
   
   
   try {
   
   const response = await fetch(url);
   
   if (!response.ok) {
   
   throw new Error("Network response was not ok");
   
    }
   
   const data = await response.json();
   
   displayResults(data);
   
    } catch (error) {
   
   console.error("Error fetching data:", error);
   
    }
   
   }
   
   
   
   function displayResults(data) {
   
   const wrapper = document.querySelector(".wrapper");
   const pagination = document.querySelector(".pagination");
   
   
   
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
   
   wrapper.innerHTML = '<p class="no-results">No movies found. Try another search!</p>';
   
    }
   
   }

   if (data.Search && data.Search.length > 0) {

    // Calculate the start and end indices for the current page
   
   const startIndex = (currentPage - 1) * resultsPerPage;
   
   const endIndex = startIndex + resultsPerPage;
   
   const paginatedResults = data.Search.slice(startIndex, endIndex);

   paginatedResults.forEach((movie) => {

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

     const totalPages = Math.ceil(data.Search.length / resultsPerPage);

if (totalPages > 1) {

pagination.innerHTML = `

 <button class="pagination-btn prev-btn" ${

currentPage === 1 ? "disabled" : ""

}>Previous</button>

 <span>Page ${currentPage} of ${totalPages}</span>

 <button class="pagination-btn next-btn" ${

currentPage === totalPages ? "disabled" : ""

}>Next</button>

 `;

 document.querySelector(".prev-btn").addEventListener("click", () => {

    if (currentPage > 1) {
    
    currentPage--;
    
    displayResults(data); // Re-render results for the previous page
    
     }
    
     });
    
    
    
    document.querySelector(".next-btn").addEventListener("click", () => {
    
    if (currentPage < totalPages) {
    
    currentPage++;
    
    displayResults(data); // Re-render results for the next page
    
     }
    
     });