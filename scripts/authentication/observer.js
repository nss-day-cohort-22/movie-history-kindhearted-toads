// author: Greg Lawrence
// purpose: to watch for changes to the active user in firebase and run code based on whether there is a user signed in
const firebase = require("firebase")
const trackedMoviesController = require("../trackedMovies/trackedMoviesController")
const addListenersSearch = require("../addListenersSearch")
const addListenersTrackedMovies = require("../trackedMovies/addListenersTrackedMovies")
const addListenersCard = require("../addListenersCards");


const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function (user) {

                if (user) {
                    // store the current user info to auth object
                    auth.activeUser = user

                    // populate the navbar welcome message with active user
                    document.querySelector(".nav__userDisplay").innerHTML = `Welcome ${user.email}!`

                    // show logout button
                    $(".nav__logoutBtn").removeClass("hidden")

                    // hide login form
                    $(".login").addClass("hidden")

                    // show searchbar
                    $(".search").removeClass("hidden")

                    // get active users tracked movie list
                    trackedMoviesController.getUserMovieList(user.uid)


                    const dataManager = require("../util/datamanager.js")
                    
                    $(".modal").modal({
                        dismissable: true,
                        complete: function () {
                            $(".movie-rating__item").removeClass("movie-rating__item--starred")
                            let targetId = $(".rated").attr("id")
                            const rating = parseInt(targetId.split("_")[1]);
                            const stuff = [parseInt($("#rating__modal").attr("data-firebaseId")), parseInt($("#rating__modal").attr("data-movieId"))]
                            dataManager.firebasePUT($("#rating__modal").attr("data-firebaseId"), { movidId: parseInt($("#rating__modal").attr("data-movieId")), rating: rating }).then(r => { })
                        }
                    });


                } else {
                    // clear out welcome message in navbar
                    document.querySelector(".nav__userDisplay").innerHTML = ""

                    // hide logout button
                    $(".nav__logoutBtn").addClass("hidden")
                    // hide searchbar
                    $(".search").addClass("hidden")


                    // clear out the active user info on the auth object
                    auth.activeUser = null
                }
            })
        }
    }
})


module.exports = observer