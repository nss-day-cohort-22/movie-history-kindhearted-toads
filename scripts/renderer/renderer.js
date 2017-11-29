const Renderer = Object.create(null, {
    
    "append": {
        value: function (movie, el) {
            //capture the element we are going to append to
            let appendToElement = $(`.${el}`);
            appendToElement.append(this.generateCard(movie, el));
        },
        enumerable: true
    },
    
    "trackedToWatched": {
        value: function (elementId) {
    
        },
        enumerable: true
    },
    
    // this function actually generates a new card
    "generateCard": {
        value: function (movie, el) {
            
            
            
            let $cardContainer = $("<div>", {
                "class": `col m4 card${movie.id}`
            });
    
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
                                <i class="close material-icons card__delete-chip" id="chip|${movie.id}">close</i>
                            </div>`;

            let actionDiv = "";

            if (movie.rating) {
                actionDiv = `<div class="card-action" id="movieAction|${movie.id}">
                             <ul class="c-rating">
                                 ${ratingString}
                             </ul>
                         </div>`;
                    
            } else if (movie.watchlist) {
                actionDiv = `<div class="card-action" id="movieaction|${movie.id}">
                         <a class="card__watched" id="watched|${movie.id}">Watched?</a>
                         </div>`;
                    
            } else {
                actionDiv = `<div class="card-action">
                         <a class="card__add-to-watchlist" id="addToWatchlist|${movie.id}">Add To Watchlist</a>
                         </div>`;
                chipDiv = "";
            }

            // capture only the first 30 words
            const overview = movie.overview.substring(0,30);
            
            const posterPath = `http://image.tmdb.org/t/p/w300${movie.posterPath}`;
            
            // put the pieces together
            $cardContainer.html(
                `<div class="card sticky-action">
                        <div class="card-image">
                        <img class="activiator" src="${posterPath}">
                        </div>
                        <div class="card-content">
                        <span class="movie__title card-title activator grey-text text-darken-4">${movie.name}<i class="material-icons right">more_vert</i></span>
                        <p>${movie.releaseDate}</p>
                        <p>${overview}</p>
                        </div>
                        ${actionDiv}
                        ${chipDiv}
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
                `);

            return $cardContainer

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
