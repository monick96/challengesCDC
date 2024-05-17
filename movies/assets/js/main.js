// Definimos la URL de la api de donde se traen el json de movies
const ApiMovie = 'https://api.themoviedb.org/3';

//definimos el objeto options  que contiene las configuraciones necesarias para la solicitud fetch
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
        
    }
};

let trendMovies = [];
// Función para cargar trend Movies
const fetchMoviesTrend = (page = 1) => {
    // Realizamos una petición fetch a la API para obtener las películas populares
    fetch(`${ApiMovie}/movie/popular?page=${page}`, options)
        .then(response => response.json()) // Convertimos la respuesta a JSON
        .then(data => {
            // Extraemos las películas de la respuesta
            trendMovies = data.results;
            renderMovies(trendMovies)
        });
}

//Funcion para renderizar los datos obtenidos de la API en trends movies
function renderMovies(movies) {
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

// Ejecutamos la función que obtiene los datos de peliculas de la API
fetchMoviesTrend();

// Event listeners para los botones de paginación
//before button
document.querySelector('#prev').addEventListener('click', () => {
    let currentPage = Number(document.querySelector('#trend').getAttribute('data-page')) || 1;
    if (currentPage > 1) {
        fetchMoviesTrend(currentPage - 1);
        document.querySelector('#trend').setAttribute('data-page', currentPage - 1);
    }
});

//next button
document.querySelector('#buttonNext').addEventListener('click', () => {
    let currentPage = Number(document.querySelector('#trend').getAttribute('data-page')) || 1;
    fetchMoviesTrend(currentPage + 1);
    document.querySelector('#trend').setAttribute('data-page', currentPage + 1);
});