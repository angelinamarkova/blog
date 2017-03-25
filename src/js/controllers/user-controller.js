let userControllers = {
    get( userService, templates) {
        return {
            login() {
                userService.isSignedIn()
                    .then(isLoggedIn => {
                        //if (isLoggedIn) {
                        //    //redirect to
                        //    window.location = "#/home";
                        //    return;
                        //}

                        userService.signIn()
                            .then(user => {
                               console.log("User: ", user);
                            });

                        templates.get("login")
                            .then((templateHtml) => {
                                let templateFunc = Handlebars.compile(templateHtml);
                                let html = templateFunc();
                                $("#container").html(html);


                            });
                    });
                }
            }
        }
    };

