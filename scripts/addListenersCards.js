const dataManager = require("../util/dataManager");
const movieFactory = require("../util/movieFactory");
const renderer = require("../renderer/renderer.js");

$(".cardContainer").on("click", (e) => {
    
    const elClass = e.target.className;
    const targetId = e.target.id;
    
    if (elClass.includes("card__add-to_watchlist")) {
        const movieId = parseInt(targetId.split("|")[1]);
        // check if this movie exists already
        if (movieFactory.cache.find(r=> r.id === movieId)) {
            console.log("already on the watchlist");
        } else {
            firebasePOST(movieId).then(() => {
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
        const movieId = parseInt(targetId.split("|")[1]);
        console.log("card__delete-chip");
        dataManager.firebaseDELETE(movieId).then(() => {
            $(`#card${movieId}`).hide();
        })
        // remove element from the display
    }
    
    
});
    