//Movie Factory - Chris Miller
//Take data from the api and spit out an object that is ready to be displayed with the following properties :
// Movie Name, Movie ID, Actors Array, imgPath, overview, fbId, tracked, Rating

const movieFactory = Object.create(null, {
    "cache": {"value": [], "writable": true, "enumberable": true},
    
    "build": {
        "value":
            function (apiObject, userTable = {"fbId":null,"rating":null}) {

                let actorsArray = []

                if(apiObject.hasOwnProperty("credits")){
                    // check the amount of actors on movie, if less than 3 use the amount to display. If more than 3, just display the first 3. 
                    let amountOfActors = 0
                    if (apiObject.credits.cast.length > 3) {
                        amountOfActors = apiObject.credits.cast.length
                    } else {
                        amountOfActors = 3
                    }

                    for (let index = 0; index < amountOfActors; index++) {
                        actorsArray.unshift(apiObject.credits.cast[index].name)
                    }
                }

                let movieObject = Object.create(null, {
                    "movieName": {"value": apiObject.title, "writable": true, "enumberable": true},
                    "movieId": {"value": apiObject.id, "writable": true, "enumberable": true},
                    "actorsArray": {"value": actorsArray, "writable": true, "enumberable": true},
                    "imgPath": {"value": apiObject.poster_path, "writable": true, "enumberable": true},
                    "overview": {"value": apiObject.overview, "writable": true, "enumberable": true},
                    "releaseDate": {"value": apiObject.release_date, "writable": true, "enumberable": true},
                    "fbId": {"value": userTable.fbId, "writable": true, "enumberable": true},
                    "rating": {"value": userTable.rating, "writable": true, "enumberable": true}
                })

                if(movieObject.fbId){
                    this.cache.push(movieObject)
                }

                return movieObject
            }, "writable": true, "enumberable": true}
})


module.exports = movieFactory