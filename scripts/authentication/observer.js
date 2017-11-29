const firebase = require("firebase")


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