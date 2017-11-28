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
            document.querySelector(".login").addEventListener("click", e => {
                console.log(e)
                if (e.target.className.includes("login__loginBtn")) {
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
            document.querySelector(".nav__logoutBtn").addEventListener("click", e => {
                this.logout()
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
                console.log("error creating account", errorCode, errorMessage)
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

                    console.log("Email or password is invalid", errorCode, errorMessage)
                })
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("user has signed out")
            }).catch(function(error) {
                // An error happened.
                console.log("error signing out")
            });
        }
    }
})



module.exports = auth