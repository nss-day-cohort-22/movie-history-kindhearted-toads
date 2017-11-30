/**
 * Krys Mathis
 * This is for displaying cards
 */
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
        /**
         *  // code for testing
            const movieId = parseInt(targetId.split("|")[1]);
            renderer.trackedToWatched(movieId, 4);
 
         */
        value: function (movieId, rating) {
            // Update the existing movie card to reflect that
            // the movie is now watched and has a rating
            const existingAction = $(`#movieaction${movieId}`)

            actionObj = {
                "movieId": movieId, 
                "rating": rating, 
                "isWatchlist": true, 
            }
            const newAction = $(this.getActions(actionObj));
            // replace existing
            existingAction.replaceWith(newAction);
        },
        enumerable: true
    },

    "getRatingLi": {
        value: function(rating) {
            // build the list for the ratings
            let ratingString = "";
            
            if (rating > 0) {
                for (let i = 0; i < 5; i++) {
                    if (i < rating) {
                        ratingString += "<li class='c-rating__item--starred'></li>";
                    } else {
                        ratingString += "<li class='c-rating__item'></li>";
                    }
                }
            }

            return ratingString;
        },
        enumerable: true
    },
    "getActions": {
        value: function(obj) {

            let actionDiv = "";
            // make sure the object is completely populated
            if (!obj.hasOwnProperty("rating") 
                || !obj.hasOwnProperty("isWatchlist")
                || !obj.hasOwnProperty("movieId")) {
                return actionDiv;
            }

            if (obj.rating > 0 && obj.isWatchlist) {
                actionDiv = `<div class="card-action" id="movieAction${obj.movieId}">
                             <ul class="c-rating">
                                 ${this.getRatingLi(obj.rating)}
                             </ul>
                         </div>`;
                    
            } else if (obj.isWatchlist) {
                actionDiv = `<div class="card-action" id="movieaction${obj.movieId}">
                         <a href="#rating__modal" class="card__watched modal-trigger" id="watched|${obj.movieId}">Watched?</a>
                         </div>`;
                    
            } else {
                actionDiv = `<div class="card-action">
                         <a class="card__add-to-watchlist" id="addToWatchlist|${obj.movieId}">Add To Watchlist</a>
                         </div>`;

            }
            return actionDiv;
        }
    },

    "getActors": {
        /**
         * This function returns the list of actors
         */
        value: function(actors) {
            let listOfActors = "";
            if (actors) {
                actors.forEach(a=> {
                    listOfActors += `<li>${a}</li>`;
                });
            }
            return listOfActors;
        },
        enumerable: true
    },
    
    // this function actually generates a new card
    "generateCard": {
        value: function (movie) {

            let $cardContainer = $("<div>", {
                "class": "col m4 card__wrapper",
                "id": `card${movie.movieId}`
            });
    
            // create the string for the rating
            let rating = movie.rating;
            // build the list for the ratings
            let ratingString = this.getRatingLi(rating);

            const isWatchlist = movie.fbId !== null && movie.rating !== null;
            let actors = this.getActors(movie.actorsArray);

            // delete chip for items that are 
            let chipDiv =   `<div class="chip">
                                delete
                                <i class="close material-icons card__delete-chip" id="chip|${movie.fbId}@${movie.movieId}">close</i>
                            </div>`;

            // if it's on the watchlist add the watched class
            // otherwise if it is just watchlisted add unwatched
            // otherwise this is just an unwatched un-watchlisted movie             
            if (isWatchlist && rating > 0) {
                $cardContainer.addClass("watched");
            } else if (isWatchlist) {
                $cardContainer.addClass("unwatched");
            } else {// unwatched untracked
                chipDiv = "";
            }
                            
            // Get the action div
            actionObj = {
                movieId: movie.movieId, 
                rating: rating, 
                isWatchlist: isWatchlist, 
            }
            actionDiv = this.getActions(actionObj);

            // capture only the first 300 words
            const overview = movie.overview.length > 300 ? movie.overview.substring(0,300) + "..." : movie.overview;
            
            // handle the poster path
            const posterPath = `http://image.tmdb.org/t/p/w342${movie.imgPath}`;
            
            // put the pieces together
            $cardContainer.html(
                `<div class="card sticky-action hoverable r-grid">
                    <div class="card-image">
                        <img class="activiator" src="${posterPath}">
                    </div>
                    <div class="card-content">
                        <span class="movie__title card-title activator grey-text text-darken-4">${movie.movieName}<i class="material-icons right"  id="additionalDetails-${movie.movieId}">more_vert</i></span>
                    <p>${movie.releaseDate}</p>
                    </div>
                        ${actionDiv}
                        ${chipDiv}
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${movie.movieName}<i class="material-icons right">close</i></span>
                        <p class="movie__overview">${overview}</p>
                        <h6>Cast:</h6>
                        <ul class="movie__actors" id="movie__actors-${movie.movieId}">${actors}</ul>
                    </div>
                </div>
                `);

            return $cardContainer;

        },
        enumerable: true
    },
});

module.exports = Renderer;
