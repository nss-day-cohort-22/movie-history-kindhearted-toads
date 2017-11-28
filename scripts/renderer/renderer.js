const $ = require("jquery");

const data = [{
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
},
{
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
},
{
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
},
{
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
},
{
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
}];

const Renderer = Object.create(null, {
   
    "all": {
        value: function(data, appendToElement) {
            //for each element in the array
            //create a new element and append it to the array
            // clear the array to start fresh
            $(appendToElement).html("");
            /**
             * Materialize uses rows to handle it's grid
             */
            let row = document.createElement("div");
            row.className = "row";

            let cardContainer = document.createElement("div");
            cardContainer.className = "col s12 cards-container";
            row.appendChild(cardContainer);

            // loop through the data array
            data.forEach(movie => {
                const posterPath = `http://image.tmdb.org/t/p/w300${movie.posterPath}`;

                cardContainer.innerHTML +=
                    `<div class="col m4">
                        <div class="card" id="movie!${movie.id}">
                            <div class="card-image">
                                <img src="${posterPath}">
                                <span class="card-title">${movie.name}</span>
                            </div>
                            <div class="card-content">
                            <p>${movie.overview}</p>
                            </div>
                            <div class="card-action">
                            <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>`;
            });
            appendToElement.append(row);

        },
        enumerable: true
    },
    "trackedToWatched": {
        value: function(elementId) {

        },
        enumerable: true
    }
});

Renderer.all(data,$(".article__image"));

