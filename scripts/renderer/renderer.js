const Renderer = Object.create(null, {
    
    "append": {
        value: function (movie, el) {
            //for each element in the array
            //create a new element and append it to the array
            let appendToElement = $(`.${el}`);
    
            let cardContainer = document.createElement("div");
            cardContainer.className = "col m4";
    
            let actionDiv = "";
            // loop through the data array
    
            // create the string for the rating
            let rating = movie.rating;
            let ratingString = "";
            for (let i = 0; i < 5; i++) {
                if (i < rating) {
                    ratingString += "<li class='c-rating__item--starred'></li>";
                } else {
                    ratingString += "<li class='c-rating__item'></li>";
                }
            }
    
            let chipDiv =   `<div class="chip">
                                            delete
                                            <i class="close material-icons">close</i>
                                        </div>`;
                // determine what should go below the image
            if (movie.rating) {
                actionDiv = `<div class="card-action" id="movie-action!${movie.id}">
                             <ul class="c-rating">
                                 ${ratingString}
                             </ul>
                         </div>`;
                    
            } else if (movie.watchlist) {
                actionDiv = `<div class="card-action" id="movie-action!${movie.id}">
                         <a href="#">Watched?</a>
                         </div>`;
                    
            } else {
                actionDiv = `<div class="card-action" id="movie-action!${movie.id}">
                         <a href="#">Add To Watchlist</a>
                         </div>`;
                chipDiv = "";
            }
    
            const overview = movie.overview.substring(0,30);
            // put the pieces together
            const posterPath = `http://image.tmdb.org/t/p/w150${movie.posterPath}`;
    
            cardContainer.innerHTML +=
                    `<div class="card" id="movie!${movie.id}">
                             <div class="card-image">
                                <!-- chip -->
                                ${chipDiv}
                                <img src="${posterPath}">
                                <span class="card-title">${movie.name}</span>
                                </div>
                                <div class="card-content">
                                <p>${movie.releaseDate}</p>
                                <p>${movie.overview}</p>
                            </div>
                                ${actionDiv}
                                </div>`;
    
            appendToElement.append(cardContainer);
    
        },
        enumerable: true
    },
    
    "trackedToWatched": {
        value: function (elementId) {
    
        },
        enumerable: true
    }
});

module.exports = Renderer;

//Test Data
// const data = [{
//     "name": "Bourne Identify",
//     "releaseDate": "2001-12-01",
//     "actors": null,
//     "id": 2501,
//     "watchlist": false,
//     "watched": false,
//     "rating": null,
//     "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
//     "overview": "In a world..."
// },
// {
//     "name": "Bourne Identify",
//     "releaseDate": "2001-12-01",
//     "actors": null,
//     "id": 2501,
//     "watchlist": true,
//     "watched": false,
//     "rating": null, 
//     "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
//     "overview": "In a world..."
// },
// {
//     "name": "Bourne Identify",
//     "releaseDate": "2001-12-01",
//     "actors": null,
//     "id": 2501,
//     "watchlist": true,
//     "watched": true,
//     "rating": 2,
//     "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
//     "overview": "In a world..."
// },
// {
//     "name": "Bourne Identify",
//     "releaseDate": "2001-12-01",
//     "actors": null,
//     "id": 2501,
//     "watchlist": true,
//     "watched": true,
//     "rating": 3,
//     "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
//     "overview": "In a world..."
// },
// {
//     "name": "Bourne Identify",
//     "releaseDate": "2001-12-01",
//     "actors": null,
//     "id": 2501,
//     "watchlist": true,
//     "watched": true,
//     "rating": 5,
//     "posterPath": "/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg",
//     "overview": "In a world..."
// }];
