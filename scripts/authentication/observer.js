// Author: Greg Lawrence
// purpose: to watch for changes to the active user in firebase and run code based on whether there is a user signed in

const firebase = require("firebase")
const userListController = require("../userList/userListController")

const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
               
                if (user) {
                    // store the current user info to auth object
                    auth.activeUser = user
                    
                    // display active user email in navbar
                    document.querySelector(".nav__userDisplay").innerHTML = user.email
                    // show logout button
                    document.querySelector(".nav__logoutBtn").classList.remove("hidden")
                    
                    // hide login form
                    document.querySelector(".login").classList.add("hidden")

                    // get active users tracked movie list
                    userListController.getUserMovieList().then()
                    
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