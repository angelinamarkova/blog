let userControllers = {
    get( userService, templates) {
        return {
            login() {
                userService.isSignedIn()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            //redirect to
                            window.location = "#/home";
                            return;
                        } else {
                            userService.signIn()
                                .then(function(result) {
                                    console.log(result);
                                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                                })
                                .catch(function(error) {
                                    // Handle Errors here.
                                    localStorage.removeItem('currentUser');
                                    var errorMessage = error.message;
                                    console.log("Could not login: ", errorMessage);
                                });
                            }
                        });
                    },

            signOut() {
                userService.signOut()
                    .then(() => {
                        app.currentUser = null;
                        userService.isSignedIn()
                        .then((resp) => {
                                console.log(`User successfully logged out ${app.currentUser}`);
                            });
                    })
                    .catch((error) => {
                        console.log(`Error ${error}`);
                    })
                }
            }
        }
    };

