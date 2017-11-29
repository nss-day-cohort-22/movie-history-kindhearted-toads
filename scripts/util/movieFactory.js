//Movie Factory - Chris Miller
//Take data from the api and spit out an object that is ready to be displayed with the following properties :
// Movie Name, Movie ID, Actors Array, imgPath, overview, fbId, tracked, Rating

const movieFactory = Object.create(null, {
    "cache": {"value": {}, "writable": true, "enumberable": true},
    
    "build": {
        "value":
            function (userTable = {"fbId":null,"rating":null}, apiObject) {

                let actorsArray = []

                if(apiObject.hasOwnProperty(credits)){
                    for (let index = 0; index < 3; index++) {
                        actorsArray.unshift(apiObject.credits.cast[index])
                    }
                }

                let movieObject = Object.create(null, {
                    "movieName": {"value": apiObject.title, "writable": true, "enumberable": true},
                    "movieId": {"value": apiObject.id, "writable": true, "enumberable": true},
                    "actorsArray": {"value": actorsArray, "writable": true, "enumberable": true},
                    "imgPath": {"value": apiObject.poster_path, "writable": true, "enumberable": true},
                    "overview": {"value": apiObject.overview, "writable": true, "enumberable": true},
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