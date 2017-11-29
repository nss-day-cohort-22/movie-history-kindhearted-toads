// author: Greg Lawrence
// purpose: to add event listeners to tracked movies list to allow user to filter movies between unwatched and watched/rated


const addListenersTrackedMovies = function () {
    // add listener to the buttons in the Tracked Movies DOM section
    document.querySelector(".trackedMovies").addEventListener("click", e =>{
    
        console.log(e)
   
        // check if the button clicked is "Unwatched Movies"
        if (e.target.className.includes("trackedMovies__unwatchedMovies")) {
            
            // hide all of the movies with the "watched" class, and only display unwatched movies
            // not sure yet if this jQuery will work on all cards at the same time
            $(".watched").addClass("hidden")
            $(".unwatched").removeClass("hidden")
        }
    
    
        // check if the button clicked is "Watched Movies"
        if (e.target.className.includes("trackedMovies__watchedMovies")) {
            // hide all of the movies with the "unwatched" class, and only display watched movies
            // not sure yet if this jQuery will work on all cards at the same time
            $(".unwatched").addClass("hidden")
            $(".watched").removeClass("hidden")
        }
    })

}

module.exports = addListenersTrackedMovies