let blogControllers = {
    get( blogService, templates) {
        return {
            blogHome() {
                templates.get('home')
                    .then(template => {
                        let compiledTemplate = Handlebars.compile(template),
                            data = {},
                            html;

                        blogService.getAllPosts()
                            .on('value', function (blogs) {
                                data.posts = blogs.val();
                                html = compiledTemplate(data);
                                $('#container').html(html);
                                console.log("Blogs: ", blogs.val());

                                $('.create-post').click( function (event){
                                    console.log(event);
                                    blogService.createPost('Heading', 'v5wNNk8nU3cw3ZLrHyKlvnzBV0G2', 'clay', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."', "https://s-media-cache-ak0.pinimg.com/736x/35/a4/b1/35a4b18ad0933bb3fe9087d1d0ca3774.jpg")
                                        .then((postKey) => {
                                            console.log(postKey);
                                        })
                                });
                            });



                    });
            }
        }
    }
};
