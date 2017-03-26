var  blogService = {

    getAllPosts() {
        return app.database.ref('/posts');
    },

    createPost(title, category, content, headerImg) {
        console.log("USer: ", JSON.parse(localStorage.getItem('currentUser')));
        var post = {
            title: title,
            author: JSON.parse(localStorage.getItem('currentUser')),
            category: category,
            content: content,
            headerImg: headerImg
        };

        console.log(post);
        return firebase.database().ref().child('posts').push(post);
    }
};