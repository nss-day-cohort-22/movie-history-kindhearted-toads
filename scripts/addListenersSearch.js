// author: Greg Lawrence
// purpose: add listeners for click events on buttons in the search field

const dataManager = require("./util/dataManager")
const renderer = require("./renderer/renderer")
const movieFactory = require("./util/movieFactory")
//
const addListenersSearch = function() {

    // add listener to the search area in nav bar 
    document.querySelector(".search").addEventListener("click", e => {
        // get value from search field
        let searchQuery = $("#searchField").val()
        searchQuery = searchQuery.split(" ").join("+");
        console.log(searchQuery);
        
        // check if the button clicked was Find A Movie
        if (e.target.className.includes("nav__findMovie")) {

            // send the search Query to the movie API to look for matches
            dataManager.searchMovies(searchQuery).then( result=>{
                result.results.forEach(movie => {
                    // send results to the render function to create DOM elements and place results in the DOM
                    renderer.append(movieFactory.build(movie), "cardContainer");
                });
            })
        }

    

        // check if the button clicked was Search My Movies
        if (e.target.className.includes("nav__searchMyMovies")) {

            // make sure all tracked movies are displayed and none of the cards have the "hidden" class
            /* -- psuedo code, may work, may not -- */
            // $("watched").removeClass("hidden")   
            // $("unwatched").removeClass("hidden")
            
            // hide the dom element that displays the Movie API Search Results
            // re-write to jQuery call
            document.querySelector("movieSearch").classList.add("hidden")
            
            // display the dom element that shows the user their tracked movies
            // re-write to jQuery call
            document.querySelector("trackedMovies").classList.remove("hidden")
            
        }
    })
}



module.exports = addListenersSearch