let generalControllers = {
    get( blogService, userService, templates) {
        return {
            footer() {
                Promise.all([
                    blogService.getAllCategories(),
                    blogService.getAllPosts(),
                    blogService.getLastComment(),
                    templates.get('footer')
                ])
                .then(([categories, posts, lastComment, template]) => {
                    let compiledTemplate = Handlebars.compile(template),
                        data = {},
                        html;

                    data.categories = categories.val();
                    data.posts = posts.val();
                    data.lastComment = lastComment.val();
                    console.log("Footer: ", data);
                    html = compiledTemplate(data);
                    $('footer').html(html);
                })
                .catch((error) => console.log(error));
            },

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

                    $('.main-nav li.active').removeClass('active');
                    $('a[href^="#/home"]').parent('li').addClass('active');
                })
                .catch((error) => console.log(error));
            },

            about() {
                Promise.all([
                    templates.get('page-header'),
                    templates.get('about')
                ])
                .then(([headerTemplate, aboutTemplate]) => {
                    let headerCompiledTemplate = Handlebars.compile(headerTemplate),
                        aboutCompiledTemplate = Handlebars.compile(aboutTemplate),
                        page = {
                            title: "About Us",
                            subtitle: "About Us Subtitle",
                            breadcrumbs: [
                                { url: "#/home", title: "Home" },
                                { url: "#/about", title: "About"}
                            ]
                        },
                        headerHtml = headerCompiledTemplate(page),
                        aboutHtml = aboutCompiledTemplate();

                    $('#container').html(aboutHtml);
                    $('.page-header').html(headerHtml);

                    $('.main-nav li.active').removeClass('active');
                    $('a[href^="#/about"]').parent('li').addClass('active');
                })
                .catch((error) => console.log(error));
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

                    $('.main-nav li.active').removeClass('active');
                    $('a[href^="#/contact"]').parent('li').addClass('active');

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
                            toastr.info('Thank you for contacting us!');
                        })
                        .catch ((error) => {
                            toastr.error('Message was not sent successfully!');
                        });
                    });
                });
            }
        }
    }
};
