let userControllers = {
    get( userService, templates) {
        return {
            login() {
                userService.signIn()
                .then(function(result) {
                    localStorage.setItem('currentUser', JSON.stringify(result.user));
                })
                .catch(function(error) {
                    localStorage.removeItem('currentUser');
                    var errorMessage = error.message;
                    console.log("Could not login: ", errorMessage);
                });
            },

            signOut() {
                userService.signOut()
                    .then(() => {
                        app.currentUser = null;
                    })
                    .catch((error) => {
                        console.log(`Error ${error}`);
                    });
                }
            }
        }
    };

