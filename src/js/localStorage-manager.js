function setLocalStorageItem(itemName, itemValue) {
    if (localStorage.getItem(itemName) === null) {
        localStorage.setItem(itemName, itemValue);
    }
}

function getLocalStorageItem(itemName) {
    if (localStorage.getItem(itemName) !== null) {
        return localStorage.getItem(itemName)
    } else {
        return null;
    }
}