const dataManager = require("./util/dataManager")


const watchedListController = Object.create(null, {
    "init": {
        value: function () {
            dataManager.firebaseGET().then(userDB => {
                userDBArray = Object.keys(userDB)
                    .map(key => {
                        userDB[key].id = key
                        return userDB[key]
                    })
                return userDBArray
            }).then(
                userDBArray.forEach( (movie)=> {
                    dataManager.getMovieByID(movie.movieId).then((returnedMovieData) =>{
                        factory(movie, returnedMovieData)
                    })
                })
            )
        }
    }
})


module.exports = watchedListController