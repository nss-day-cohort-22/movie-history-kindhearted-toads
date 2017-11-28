// author: Greg Lawrence
// purpose: get the user's database of tracked movies from firebase and then gather the details for each movie from api. Then send this data into factory to format into one object, and then render the info to the page.

const dataManager = require("./util/dataManager")
// const factory = require("./")
// const render = require("../render/render")

const userListController = Object.create(null, {
    "getUserMovieList": {
        value: function () {
            dataManager.firebaseGET().then(userDB => {
                userMovieListArray = Object.keys(userDB)
                    .map(key => {
                        userDB[key].fbId = key
                        return userDB[key]
                    })
                return userMovieListArray
            }).then(
                userMovieListArray.forEach( movie => {
                    dataManager.getMovieByID(movie.movieId).then(returnedMovieData =>{
                        render.all(factory(movie, returnedMovieData))
                    })
                })
            )
        }
    }
})


module.exports = userListController