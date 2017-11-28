const $ = require("jquery");

data = {
    "name": "Bourne Identify",
    "releaseDate": "2001-12-01",
    "actors": null,
    "id": 2501,
    "watchlist": true,
    "watched": true,
    "rating": 5,
    "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
    "overview": "In a world..."
}

const Renderer = Object.create(null, {
   
    "all": {
        value: function(data, appendToElement) {
            //for each element in the array
            //create a new element and append it to the array
            $(appendToElement).html("");
            $row = $("div")
            $row.addClass("row");

            const posterPath = `http://image.tmdb.org/t/p/w300${data.poster_path}`
            data.forEach(movie => {
                
                if 
                
                $row.append(
                    `<div class="card" id="movie!${movie.id}">
                        <div class="card-image">
                            <img src="${movie.posterPath}">
                            <span class="card-title">${movie.name}</span>
                        </div>
                        <div class="card-content">
                        <p>${movie.overview}</p>
                        </div>
                        <div class="card-action">
                        <a href="#">This is a link</a>
                        </div>
                    </div>`)
            })
           
        },
        enumerable: true
    },
    "trackedToWatched": {
        value: function(elementId) {

        },
        enumerable: true
    }
});

