// author: Greg Lawrence
// purpose: to watch for changes to the active user in firebase and run code based on whether there is a user signed in

const firebase = require("firebase")
const trackedMoviesController = require("../trackedMovies/trackedMoviesController")



const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
               
                if (user) {
                    // store the current user info to auth object
                    auth.activeUser = user
                     
                    document.querySelector(".nav__userDisplay").innerHTML = `Welcome ${user.email}!`

                    // show logout button
                    document.querySelector(".nav__logoutBtn").classList.remove("hidden")
                    
                    // hide login form
                    document.querySelector(".login").classList.add("hidden")

                    // get active users tracked movie list
                    trackedMoviesController.getUserMovieList().then()
                    
                } else {
                    // hide logout button
                    document.querySelector(".nav__logoutBtn").classList.add("hidden")
                    
                    auth.activeUser = null
                }
            })
        }
    }
})


module.exports = observer