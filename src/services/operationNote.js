import axios from "axios";


export const getAllNote = (callback) => {
    axios.get("http://localhost:4000/Notes").then((response) => {
        callback(response.data);
    });
}

export const deleteNote = (id, callback) => {
    axios.delete(`http://localhost:4000/notes/delete/${id}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
    });
}

export const updateNote = (id, note, callback) => {
    axios.put(`http://localhost:4000/notes/update/${id}`, note).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
    });
}

export const addNote = (note, callback) => {
    axios.post('http://localhost:4000/notes/add', note)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

    getAllNote(callback);
}