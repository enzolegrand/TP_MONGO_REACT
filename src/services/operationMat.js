import axios from "axios";

export const getAllMatières = (callback) => {
    axios.get('http://localhost:4000/Matieres')
        .then((response) => {
            callback(response.data);
    });
}

export const deleteMat = (id, callback) => {
    axios.delete(`http://localhost:4000/matiere/delete/${id}`)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
}

export const updateMat = (id, mat, callback) => {
    axios.put(`http://localhost:4000/matiere/update/${id}`, mat)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
}

export const addMat = (mat, callback) => {
    axios.post('http://localhost:4000/addMat', mat)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

    getAllMatières(callback);
}