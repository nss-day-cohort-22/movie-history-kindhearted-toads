const firebase = require("firebase")


const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {
               
                if (user) {
                    // store the current user info to auth object
                    auth.activeUser = user
                    debugger
                    document.querySelector(".nav__userDisplay").innerHTML = user.email
                    // show logout button
                    document.querySelector(".nav__logoutBtn").classList.remove("hidden")
                    
                    // hide login form
                    document.querySelector(".login").classList.add("hidden")
                    
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