let blogControllers = {
    get( blogService, templates) {
        return {
            blogHome() {
                templates.get('home')
                    .then(template => {
                        console.log("Home");
                        let compiledTemplate = Handlebars.compile(template),
                            data = {},
                            html;

                        blogService.getAllPosts()
                            .on('value', function (blogs) {
                                data.posts = blogs.val();
                                html = compiledTemplate(data);
                                $('#container').html(html);
                                console.log("Blogs: ", blogs.val());
                            })
                    });
            }
        }
    }
};
