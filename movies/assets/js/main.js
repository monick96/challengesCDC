// Definimos la URL de la api de donde se traen el json de movies
const ApiMovie = 'https://api.themoviedb.org/3';
const ApiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8';

//definimos el objeto options  que contiene las configuraciones necesarias para la solicitud fetch
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: ApiKey
        
    }
};

let currentPage = 1;
// Fetch para cargar trend Movies
function fetchMoviesTrend (page = 1){
    // Realizamos una petición fetch a la API para obtener las películas populares
    fetch(`${ApiMovie}/movie/popular?page=${page}`, options)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            // Extraemos las películas de la respuesta y pasamos 
            //como argumento a la  funcion  para renderizarlas
            renderTrendMovies(data.results);
            document.querySelector('#trend').setAttribute('data-page', page);
        })
        .catch(error => console.error('Error fetching popular movies:', error));
}


// Fetch para cargar Acclaimed Movies
function fetchAcclaimedMovies() {
    // Realizamos una petición fetch a la API para obtener las películas mas aclamadas
    fetch(`${ApiMovie}/movie/top_rated`, options)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            // Extraemos las películas de la respuesta pasamos
            //como argumento a la  funcion  para renderizarlas
            renderAcclaimedMovies(data.results);
        })
        .catch(error => console.error('Error fetching acclaimed movies:', error));
}


//Funcion para renderizar los datos obtenidos de la API en trends movies
function renderTrendMovies(movies) {
    const moviesResult = movies;
    let template = '';
    for(let movie of moviesResult) {
        template += 
        `
        <div class="trendMovies">
                        <a href="./peliInfo.html">
                            <div class="movie">
                                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"
                                    loading="lazy">
                                <div class="movieTittle">
                                    <h4>${movie.title}</h4>
                                </div>
                            </div>
                        </a>
        </div>
        `
    }
    // document.getElementById("trendContainer").innerHTML = template;
    document.querySelector('#trendContainer').innerHTML = template;
}
//Funcion para renderizar los datos obtenidos de la API en movies aclamadas
function renderAcclaimedMovies(AcclaimedMovies) {
    const moviesResult = AcclaimedMovies;
    let template = '';
    for(let movie of moviesResult) {
        template += 
        `
        <div class="peliculaItem">
                    <img class="imgAclamada" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
                    alt="${movie.title}" loading="lazy">
        </div>
        `
    }
    // document.getElementById("aclamadasContainer").innerHTML = template;
    document.querySelector('#aclamadasContainer').innerHTML = template;
}

// Ejecutamos la función que obtiene los datos de peliculas populares de la API
fetchMoviesTrend();
// Ejecutamos la función que obtiene los datos de peliculas aclamadas de la API
fetchAcclaimedMovies();

// Event listeners para los botones de paginación
//before button
document.querySelector('#prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage --;
        fetchMoviesTrend(currentPage);
    }
});

//next button
document.querySelector('#buttonNext').addEventListener('click', () => {
    currentPage++;
    fetchMoviesTrend(currentPage);
});