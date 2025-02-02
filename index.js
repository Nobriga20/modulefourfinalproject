document.getElementById('search__btn').addEventListener('click', fetchData);

async function fetchData() {
    const query = document.getElementById('searchInput').value;
    const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=dd4916f0${encodeURIComponent(query)}`;

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
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    
    data.items.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.innerText = item.title; // Adjust based on your API's data structure
        resultsDiv.appendChild(resultItem);
    });
}