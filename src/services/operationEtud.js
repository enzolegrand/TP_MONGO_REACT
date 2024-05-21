import axios from 'axios';

export const getAll = (callback) => {
    axios.get('http://localhost:4000/Etudiants')
        .then((response) => {
            callback(response.data);
    });
}
/*
export const add = (student, callback) => {
    axios.post('http://localhost:4000/add', student)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
}
*/

export const update = (id, student, callback) => {
    axios.put(`http://localhost:4000/update/${id}`, student)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
}

export const add = (student, callback) => {
    axios.post('http://localhost:4000/add', student)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

    getAll(callback);
}

export const remove = (id, callback) => {
    axios.delete(`http://localhost:4000/delete/${id}`)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
}

export const getAllMatières = (callback) => {
    axios.get('http://localhost:4000/Matieres')
        .then((response) => {
            callback(response.data);
    });
}