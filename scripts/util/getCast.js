//Get Cast - Chris Miller
//use this module to fetch the cast by movie id - and decompose an object of cast members into an array of no more than the top 5 billed

const dataManager = ("./dataManager")

const getCast = Object.create(null, {
    //save the api results to cache, incase?
    "cache": {"value": null, "writable": true, "enumberable": true},
    
    //call the dataManager to ping the api by movie Id to retreive the actors for the movie - send it to decompose
    "fetch": {"value": function(movieId){
        return dataManager.getCast(movieId).then(
            function(movie){
                this.cache = movie
                return this.decompose(movie.cast)
            })
    }, "writable": true, "enumberable": true},
        
    //call thist method to convert an object of all cast into an array of the top 5 actors - return the array
    "decompose": {"value": function(castArray){

        let actorsArray = []

        let amountOfActors = 0

        if (castArray.length < 5) {
            amountOfActors = castArray.length
        } else {
            amountOfActors = 5
        }
        
        for (let index = 0; index < amountOfActors; index++) {
            actorsArray.push(castArray[index].name)
        }

        return actorsArray

    }, "writable": true, "enumberable": true}
})

module.exports = getCast