// author: Greg Lawrence
// purpose: get the user's database of tracked movies from firebase and then gather the details for each movie from api. Then send this data into factory to format into one object, and then render the info to the page.

const dataManager = require("../util/dataManager")
const movieFactory = require("../util/movieFactory")
const renderer = require("../renderer/renderer")


const trackedMoviesController = Object.create(null, {
    "getUserMovieList": {
        value: function (userUID) {
            dataManager.setUID(userUID)
            dataManager.firebaseGET().then(userDB => {
                debugger
                userMovieListArray = Object.keys(userDB)
                    .map(key => {
                        userDB[key].fbId = key
                        return userDB[key]
                    })
                return userMovieListArray
            }).then( userMovieListArray => {
                this.getMovieDetails(userMovieListArray)
            }
            )
        }
    },
    "getMovieDetails": {
        value: function (userMovieListArray) {
            userMovieListArray.forEach( movie => {
                dataManager.getMovieByID(movie.movieId).then(returnedMovieData =>{
                    renderer.append(movieFactory.build(movie, returnedMovieData), "trackedMovies__container")
                })
            })
        }
    }
})


module.exports = trackedMoviesController