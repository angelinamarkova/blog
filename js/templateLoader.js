/**
 * Created by Angelina on 10/1/2016.
 */

let templates = {
    get(name) {
        let url = `./templates/${name}.html`;
        return requester.get(url);
    }
};

