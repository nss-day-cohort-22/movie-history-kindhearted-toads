const dataManager = require("./util/dataManager");
const movieFactory = require("./util/movieFactory");
const renderer = require("./renderer/renderer.js");
const trackedMoviesController = require("./trackedMovies/trackedMoviesController");

addListenersCards = () => {

    $(".cardContainer").on("click", (e) => {

        const elClass = e.target.className;
        const targetId = e.target.id;
    
        if (elClass.includes("card__add-to-watchlist")) {
            const movieId = parseInt(targetId.split("|")[1]);
            // check if this movie exists already
            if (movieFactory.cache.find(r=> r.id === movieId)) {
                console.log("already on the watchlist");
            } else {
                dataManager.firebasePOST(movieId).then((results) => {
                    const movieObj = {
                        "movieId": movieId,
                        "fbId": results.name,
                        "rating": 0
                    }
                    trackedMoviesController.getMovieDetails([movieObj]);
                    $(`#card${movieId}`).remove();
                });
            }
        }

        if (elClass.includes("card__watched")) {
            const movieId = parseInt(targetId.split("|")[1]);
            console.log("card__watched - launch modal");
        //class = modal-content
        }

        if (elClass.includes("movie-rating___item")) {
            const rating = parseInt(targetId.split("movie-rating___item")[1]);
            dataManager.firebasePUT({movidId: 1234, rating: rating}).then(r=> {
                const userTable = movieFactory.cache;
                return userTable
            }).then(result => {
                dataManager.getMovieById(movieId);
            });
        }


        if (elClass.includes("card__delete-chip")) {
            
            const movieIdParts = targetId.split("|")[1];
            const fbId = movieIdParts.split("@")[0];
            const movieId = movieIdParts.split("@")[1];

            console.log("card__delete-chip");
            
            dataManager.firebaseDELETE(fbId).then(() => {
                $(`#card${movieId}`).hide();
            })
        // remove element from the display
        }
    
    
    });
}
    
module.exports = addListenersCards;