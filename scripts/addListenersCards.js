const dataManager = require("../util/dataManager");
const movieFactory = require("../util/movieFactory");

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
        
    }

    if (elClass.includes("card__delete-chip")) {
        const movieId = parseInt(targetId.split("|")[1]);
        console.log("card__delete-chip");
        // remove element from the display
        $(`#card${movieId}`).hide();
    }
    
    
});
    