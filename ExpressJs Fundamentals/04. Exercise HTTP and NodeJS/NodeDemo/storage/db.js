const fs = require('fs');
let storage = {};
let objectLength = 0;

function objectCount() {
    for (let key in storage) {
        if(storage.hasOwnProperty(key)){
            objectLength++;
        }
    }
    return objectLength;
}

function put(key, value) {
    if (typeof (key) !== 'string') {
        console.log('Key must be a string!');
        return
    }

    return storage[key] = value;
}

function get(key) {
    if (storage.hasOwnProperty(key)) {
        return storage[key];
    }
    else console.log('Key does not exist.');
}

function getAll() {

    objectCount();
    if (objectLength === 0) {
        return 'There are no items in the storage.';
    }
    else {
        return storage;
    }
}

function update(key, value) {
    if (storage.hasOwnProperty(key)) {
        return storage[key] = value;
    }
    else {
        console.log('No such key in the database');
    }
}


function deleteItem(key) {
    if (storage.hasOwnProperty(key)) {
        delete storage[key];
    }
    else {
        console.log('No such key in the database');
    }
}

function clear() {
    storage = {} ;
    objectLength = 0;
}

function save() {
    fs.writeFileSync('./storage/data.json', JSON.stringify(storage), 'utf-8')
}

function load(callback) {
    fs.readFile('./storage/data.json', 'utf-8',((err, data) => {
        if(err){
            return
        }
        storage=JSON.parse(data);
        console.log(callback());
    }));
}


module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
};