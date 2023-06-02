const global = {
    currentPage: window.location.pathname
}

async function getPopularMovies() {
    const { results } = await fetchData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path ? `<img 
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                class="card-img-top" 
                alt="${movie.title}">` : 
                `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}">`
            }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
        </div>
        `;
        // Append card to movies div
        document.querySelector('#popular-movies').appendChild(div);
    })
};

// Fetch data from TMDB API when given an endpoint
async function fetchData(endpoint: string) {
    const API_KEY = '6914b9f184c05b3e80d856880f362424';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    return data;
};

// Highlight Current Page
function highlightCurrentPage() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') == global.currentPage) {
            link.classList.add('active');
        }
    })
};

// Init App
function init() {
    switch (global.currentPage) {
        case '/' || '/index.html':
            getPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightCurrentPage();
}

document.addEventListener('DOMContentLoaded', init);