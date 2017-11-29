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
        value: function (movie, el) {
            // update object
            // movie.watched = true;
            const newCard = this.generateCard(movie, el);
            const existingCard = $(`#card${movie.movieId}`);
            existingCard.replaceWith(newCard);
        },
        enumerable: true
    },

    "getActors": {
        value: function(actors) {
            let listOfActors = "";
            actors.forEach(a=> {
                listOfActors += `<li>${a}</li>`;
            });
            return listOfActors;
        },
        enumerable: true
    },
    // this function actually generates a new card
    "generateCard": {
        value: function (movie, el) {

            let $cardContainer = $("<div>", {
                "class": "col m4 card__wrapper hoverable",
                "id": `card${movie.movieId}`
            });
    
            // create the string for the rating
            let rating = movie.rating;
            
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
            
            const isWatchlist = movie.fbId !== null && movie.rating !== null;

            let actors = this.getActors(movie.actorsArray);


            let chipDiv =   `<div class="chip">
                                delete
                                <i class="close material-icons card__delete-chip" id="chip|${movie.fbId}@${movie.movieId}">close</i>
                            </div>`;

            let actionDiv = "";

            if (movie.rating > 0 && isWatchlist) {
                $cardContainer.addClass("watched");
                actionDiv = `<div class="card-action" id="movieAction|${movie.movieId}">
                             <ul class="c-rating">
                                 ${ratingString}
                             </ul>
                         </div>`;
                    
            } else if (isWatchlist) {
                $cardContainer.addClass("unwatched");
                actionDiv = `<div class="card-action" id="movieaction|${movie.movieId}">
                         <a href="#rating__modal" class="card__watched modal-trigger" id="watched|${movie.movieId}">Watched?</a>
                         </div>`;
                    
            } else {
                actionDiv = `<div class="card-action">
                         <a class="card__add-to-watchlist" id="addToWatchlist|${movie.movieId}">Add To Watchlist</a>
                         </div>`;
                chipDiv = "";
            }

            // capture only the first 30 words
            const overview = movie.overview.length > 300 ? movie.overview.substring(0,300) : movie.overview;
            
            const posterPath = `http://image.tmdb.org/t/p/w342${movie.imgPath}`;
            
            // put the pieces together
            $cardContainer.html(
                `<div class="card sticky-action">
                    <div class="card-image">
                    <img class="activiator" src="${posterPath}">
                    </div>
                    <div class="card-content">
                    <span class="movie__title card-title activator grey-text text-darken-4">${movie.movieName}<i class="material-icons right">more_vert</i></span>
                    <p>${movie.releaseDate}</p>
                    </div>
                        ${actionDiv}
                        ${chipDiv}
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${movie.movieName}<i class="material-icons right" id="additionalDetails|${movie.movieId}">close</i></span>
                        <p class="movie__overview">${overview}</p>
                        <ul class="movie__actors" id="movie__actors|${movie.movieId}"></ul>
                    </div>
                </div>
                `);

            // Add Event Listeners to the Card

            return this.AddEventListener($cardContainer);

        },
        enumerable: true
    },
    "AddEventListener": {
        value: function(card) {
            // card.on("click", function(e) {
            //     const el = e.target;

            //     if (el.className.includes("card__delete-chip")) {
            //         const targetId = el.id;
            //         const movieId = parseInt(targetId.split('|')[1]);
            //         $(`.card${movieId}`).hide();
            //     }

            // });
            return card;
        },
        enumerable: true
    }

});

module.exports = Renderer;
