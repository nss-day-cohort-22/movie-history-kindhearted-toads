// author: Greg Lawrence
// purpose: to handle everything related to creating a user, logging into site, logging out.

const firebase = require("firebase")
const observer = require("./observer")

var config = {
    apiKey: "AIzaSyAxryWMWNf6vB-mFlSW25NVm6B0V5-3BWE",
    authDomain: "movie-history-59344.firebaseapp.com",
    databaseURL: "https://movie-history-59344.firebaseio.com",
    projectId: "movie-history-59344",
    storageBucket: "movie-history-59344.appspot.com",
    messagingSenderId: "530608339686"
};


const auth = Object.create(null,{
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)
            
            
            // add listener to the login/register buttons button
            $(".login").on("click", e => {
                
                if (e.target.className.includes("login__loginBtn")) {

                    // if (!document.querySelector("[name='login__password']").value) {
                    //     Materialize.toast("please enter a password and try again", 4000)
                    // }

                    // Validate login information
                    this.validate(
                        document.querySelector("[name='login__email']").value,
                        document.querySelector("[name='login__password']").value
                    )
                    
                    // Clear the form
                    document.querySelector("[name='login__email']").value = ""
                    document.querySelector("[name='login__password']").value = ""
                }
                
                if (e.target.className.includes("login__registerBtn")) {
                // Validate new user information
                    this.register(
                        document.querySelector("[name='login__email']").value,
                        document.querySelector("[name='login__password']").value
                    )
                    // Clear the form
                    document.querySelector("[name='login__email']").value = ""
                    document.querySelector("[name='login__password']").value = ""
                }
            })
            
            // add listener to the logout button
            $(".nav__logoutBtn").on("click", e => {
                this.logout()

                // hide users tracked movies list
                $(".trackedMovies").addClass("hidden")
                // hide users movieResults list
                $(".movieResults").addClass("hidden")

                // clear out the search field
                $("#searchField").val("")

                // display the login form
                $(".login").removeClass("hidden")

                // empty users tracked movies list
                $(".trackedMovies__cardContainer").html("")
                // empty users searched movies list
                $(".movieResults__cardContainer").html("")

            })

            // Set up authentication observer
            observer.init(this)
        }
    },
    "register": {
        value: function(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                Materialize.toast(erroCode + errorMessage, 3000)
            });
        }
    },
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    Materialize.toast(errorCode + errorMessage, 3000)
                })
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                Materialize.toast("Goodbye!", 3000)
            }).catch(function(error) {
                // An error happened.
                Materialize.toast("There was an error signing out", 3000)
            });
        }
    }
})



module.exports = auth