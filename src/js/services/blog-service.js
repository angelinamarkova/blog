var  blogService = {

    getAllPosts() {
        console.log("Get posts");
        return database.ref('/blogs');
    }
};