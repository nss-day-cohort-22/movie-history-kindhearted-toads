const Renderer = Object.create(null, {
    
    "append": {
        value: function (movie, el) {
            
            //capture the element we are going to append to
            let appendToElement = $(`.${el}`);
            
            // this is the element we are building
            let cardContainer = document.createElement("div");
            cardContainer.className = "col m4";
    
            // create the string for the rating
            let rating = movie.rating;
            
            // build the list for the ratings
            let ratingString = "";
            
            if (rating) {
                for (let i = 0; i < 5; i++) {
                    if (i < rating) {
                        ratingString += "<li class='c-rating__item--starred'></li>";
                    } else {
                        ratingString += "<li class='c-rating__item'></li>";
                    }
                }
            }
    
            let chipDiv =   `<div class="chip">
                                            delete
                                            <i class="close material-icons">close</i>
                                        </div>`;
            let actionDiv = "";

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

            // capture only the first 30 words
            const overview = movie.overview.substring(0,30);
            
            const posterPath = `http://image.tmdb.org/t/p/w150${movie.posterPath}`;
            
            // put the pieces together
            cardContainer.innerHTML +=
                    `<div class="card" id="movie!${movie.id}">
                        <div class="card-image">
                            ${chipDiv}
                            <img src="${posterPath}">
                            <span class="card-title">${movie.name}</span>
                        </div>
                            <div class="card-content">
                            <p>${movie.releaseDate}</p>
                            <p>${overview}</p>
                        </div>
                        ${actionDiv}
                    </div>`;
    
            // append the card to the element
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
