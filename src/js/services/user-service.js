var userService = {
    isSignedIn() {
        return Promise.resolve()
            .then(() => {
                return firebase.User ? true : false;
            });

    },

    signIn() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            var user = result.user;
            console.log("User: ", user);
        }).catch(function(error) {
            // Handle Errors here.
            console.log("Token: ", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
};