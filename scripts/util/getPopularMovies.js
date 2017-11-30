// Author: Greg Lawrence
// get top 5 popular movies from imdb and send to the factory and renderer to display in DOM. Cache results and then use cache later when needed again

const dataManager = require("./dataManager")
const renderer = require("../renderer/renderer")
const movieFactory = require("../util/movieFactory")


const getPopularMovies = Object.create(null, {
    //save the popularMovie results to cache to use later
    "cache": {"value": [], "writable": true, "enumberable": true},

    //call the dataManager to ping the api to retreive the popular movies
    "fetch": {"value": function(){
        return dataManager.getPopular().then( result => {
            
            //erase cache each time this is run to start fresh
            this.cache = [];

            // set header for dom section
            $(".movieResults__cardContainer").html("<header class='header'><h3>Today's Popular Movies</h3></header>")

            for (let i=0;i<9;i++) {
                let currentMovie = result.results[i]
                // send results to the render function to create DOM elements and place results in the DOM
                builtMovie = movieFactory.build(currentMovie)
                renderer.append(builtMovie, "movieResults__cardContainer");
                // send current built movie to popularMovie cache array
                this.cache.push(builtMovie)
            }
        })
 
    }, "writable": true, "enumberable": true},

    // use cache to display popular movies later
    "displayCached": {"value": function() {

        // set header for dom section
        $(".movieResults__cardContainer").html("<header class='header'><h3>Today's Popular Movies</h3></header>")
        
        // pull popular movie data from cache and display in dom
        this.cache.forEach(movie => {
            renderer.append(movie, "movieResults__cardContainer");
        })
    }}

})



module.exports = getPopularMovies