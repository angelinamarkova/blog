let generalControllers = {
    get( blogService, userService, templates) {
        return {
            home() {
                Promise.all([
                    blogService.getAllCategories(),
                    blogService.getAllPosts(),
                    templates.get('home')
                ])
                    .then(([categories, posts, template]) => {
                        let compiledTemplate = Handlebars.compile(template),
                            data = {},
                            html;

                        data.categories = categories.val();
                        data.posts = posts.val();
                        html = compiledTemplate(data);
                        $('#container').html(html);

                        $('.create-post').click( function (event){
                            blogService.createPost('Heading', 'v5wNNk8nU3cw3ZLrHyKlvnzBV0G2', 'clay', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', "https://s-media-cache-ak0.pinimg.com/736x/35/a4/b1/35a4b18ad0933bb3fe9087d1d0ca3774.jpg")
                                .then((postKey) => {
                                    console.log(postKey);
                                })
                        });

                        $('.create-category').click( function (event){
                            blogService.createCategory('Category Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', "http://4.bp.blogspot.com/-OsRbRApr7UE/UfY-GMESnpI/AAAAAAAAViI/bo3KXXYZ0so/s1600/Ellen-Jewett-owl.jpg")
                                .then((categoryKey) => {
                                    console.log(categoryKey);
                                })
                        });
                    });
            },

            about() {
                Promise.all([
                    blogService.getAllCategories(),
                    blogService.getAllPosts(),
                    templates.get('home')
                ])
                    .then(([categories, posts, template]) => {
                        let compiledTemplate = Handlebars.compile(template),
                            data = {},
                            html;

                        data.categories = categories.val();
                        data.posts = posts.val();
                        html = compiledTemplate(data);
                        $('#container').html(html);

                        $('.create-post').click( function (event){
                            blogService.createPost('Heading', 'v5wNNk8nU3cw3ZLrHyKlvnzBV0G2', 'clay', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', "https://s-media-cache-ak0.pinimg.com/736x/35/a4/b1/35a4b18ad0933bb3fe9087d1d0ca3774.jpg")
                                .then((postKey) => {
                                    console.log(postKey);
                                })
                        });

                        $('.create-category').click( function (event){
                            blogService.createCategory('Category Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', "http://4.bp.blogspot.com/-OsRbRApr7UE/UfY-GMESnpI/AAAAAAAAViI/bo3KXXYZ0so/s1600/Ellen-Jewett-owl.jpg")
                                .then((categoryKey) => {
                                    console.log(categoryKey);
                                })
                        });
                    });
            },

            contact() {
                Promise.all([
                    templates.get('page-header'),
                    templates.get('contact')
                ])
                .then(([headerTemplate, contactTemplate]) => {
                    let headerCompiledTemplate = Handlebars.compile(headerTemplate),
                        contactCompiledTemplate = Handlebars.compile(contactTemplate),
                        page = {
                            title: "Contact Us",
                            subtitle: "Contact Us Subtitle",
                            breadcrumbs: [
                                { url: "#/home", title: "Home" },
                                { url: "#/contact", title: "Contact Us"}
                            ]
                        },
                        headerHtml = headerCompiledTemplate(page),
                        contactHtml = contactCompiledTemplate();

                    $('#container').html(contactHtml);
                    $('.page-header').html(headerHtml);

                    $('.btn-add-comment').click((event) => {
                        var commentContent = $('#message').val(),
                        comment = {
                            authorKey: JSON.parse(localStorage.getItem('currentUser')).uid,
                            authorName: JSON.parse(localStorage.getItem('currentUser')).displayName,
                            authorEmail: JSON.parse(localStorage.getItem('currentUser')).email,
                            authorImg: JSON.parse(localStorage.getItem('currentUser')).photoURL,
                            content: commentContent
                        };

                        userService.sendMessage(comment)
                        .then((message) => {
                            console.log(`Message: ${message}`);
                        })
                        .catch ((error) => {
                            console.log(`Could not send message: ${error}`);
                        });
                    });
                });
            }
        }
    }
};
