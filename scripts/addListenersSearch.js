// author: Greg Lawrence
// purpose: add listeners for click events on buttons in the search field

const dataManager = require("./util/dataManager")
const $ = require("./jquery")

const addListenersSearch = function() {

    // add listener to the search area in nav bar 
    document.querySelector("nav__saerch").addEventListener("click", e => {
        // get value from search field
        const searchQuery = document.querySelector("[name='search']").value
        
        // check if the button clicked was Find A Movie
        if (e.target.className.includes("nav__findMovie")) {

            // send the search Query to the movie API to look for matches
            dataManager.searchMovies(searchQuery).then( (results)=>{
            // send results to the render function to create DOM elements and place results in the DOM
                render.append(results, "movieSearch__container")
            })
        }

        // check if the button clicked was Search My Movies
        if (e.target.className.includes("nav__searchMyMovies")) {

            // make sure all tracked movies are displayed and none of the cards have the "hidden" class
            /* -- psuedo code, may work, may not -- */
            // $("watched").removeClass("hidden")   
            // $("unwatched").removeClass("hidden")
            
            // hide the dom element that displays the Movie API Search Results
            document.querySelector("movieSearch").classList.add("hidden")

            // display the dom element that shows the user their tracked movies
            document.querySelector("trackedMovies").classList.remove("hidden")
            
        }
    })
}



module.exports = addListenersSearch