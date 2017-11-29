// author: Greg Lawrence
// purpose: to watch for changes to the active user in firebase and run code based on whether there is a user signed in

const firebase = require("firebase")
// const trackedMoviesController = require("../trackedMovies/trackedMoviesController")
const addListenersSearch = require("../addListenersSearch")


const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
               
                if (user) {
                    // store the current user info to auth object
                    auth.activeUser = user
                     
                    document.querySelector(".nav__userDisplay").innerHTML = `Welcome ${user.email}!`

                    // show logout button
                    $(".nav__logoutBtn").removeClass("hidden")
                    
                    // hide login form
                    $(".login").addClass("hidden")

                    // get active users tracked movie list
                    // trackedMoviesController.getUserMovieList().then()

                    addListenersSearch()
                   
                } else {
                    // hide logout button
                    $(".nav__logoutBtn").addClass("hidden")
                    
                    // display the login form
                    $(".login").removeClass("hidden")

                    // clear out the active user info on the auth object
                    auth.activeUser = null
                }
            })
        }
    }
})


module.exports = observer