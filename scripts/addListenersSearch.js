// author: Greg Lawrence
// purpose: add listeners for click events on buttons in the search field

const dataManager = require("./util/dataManager")
const renderer = require("./renderer/renderer")
const movieFactory = require("./util/movieFactory")


const addListenersSearch = function() {

    // add listener to the search area in nav bar 
    document.querySelector(".search").addEventListener("click", e => {

        
        // get value from search field
        let searchQuery = $("#searchField").val()
        
        
        // check if the button clicked was Find A Movie
        if (e.target.className.includes("nav__findMovie")) {
            
            // format searchQuery to use as url String
            searchQuery = searchQuery.split(" ").join("+");

            // show the dom element that displays the Find A Movie API Search Results
            $(".movieResults").removeClass("hidden")
    
            // hide the dom element that shows the user their tracked movies
            $(".trackedMovies").addClass("hidden")

            
            if (searchQuery) {

                // clear out any previous search results 
                $(".movieResults__cardContainer").html("")


                // send the search Query to the movie API to look for matches
                dataManager.searchMovies(searchQuery).then( result=>{
                    result.results.forEach(movie => {
                        // send results to the render function to create DOM elements and place results in the DOM
                        renderer.append(movieFactory.build(movie), "movieResults__cardContainer");
                    });

                    // check if any results were sent, if no results show a
                    if ($(".movieResults__cardContainer").html() === "") {
                        $(".movieResults__cardContainer").html("<h5>No matches found</h5>")
                    }
                })
                
            } else {
                // write code to show the Top 3 or Top 5 movies
                $(".movieResults__cardContainer").html("<h5>No matches found</h5>")
            }
        }

        

        
        
        // check if the button clicked was Search My Movies
        if (e.target.className.includes("nav__searchMyMovies")) {
            console.log("searchQuery: ", searchQuery)

            // clear out any previous search results 
            $(".trackedMovies__cardContainer").html("")
            
            if (searchQuery) {

                // search user's tracked movies to check if a movie matched the title the user put in search field
                movieFactory.cache.forEach(movie => {
                    
                    if (movie.movieName.toLowerCase().includes(searchQuery.toLowerCase())) {
                        renderer.append(movie, "trackedMovies__cardContainer")
                    }

                })
            } else {
                // if nothing is in search input field and user clicks "Search My Movies", show ALL of their tracked movies
                movieFactory.cache.forEach(movie => {
                    renderer.append(movie, "trackedMovies__cardContainer")
                })
            }
            
            // check if any results were sent, if no results show a message
            if ($(".trackedMovies__cardContainer").html() === "") {
                $(".trackedMovies__cardContainer").html("<h5>No matches found</h5>")
            }

            // make sure all tracked movies are displayed and none of the cards have the "hidden" class
            /* -- psuedo code, may work, may not -- */
            // $("watched").removeClass("hidden")   
            // $("unwatched").removeClass("hidden")
            
            // hide the dom element that displays the Find A Movie API Search Results
            $(".movieResults").addClass("hidden")
            
            // display the dom element that shows the user their tracked movies
            $(".trackedMovies").removeClass("hidden")
            
        }
    })
}



module.exports = addListenersSearch