import axios from "axios";

export const getAllEns = (callback) => {
    axios.get("http://localhost:4000/Enseignants").then((response) => {
        callback(response.data);
    });
}

export const addEns = (ens, callback) => {
    axios.post('http://localhost:4000/ens/add', ens)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

    getAllEns(callback);
}

export const deleteEns = (id, callback) => {
    axios.delete(`http://localhost:4000/ens/delete/${id}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
    });
}

export const getMatiereByCode = (code) => {
    axios.get(`http://localhost:4000/Matieres`).then((response) => {
        response.data.forEach((mat) => {
            if (mat.CodeMat === code) {
                return mat.LibelléMat;
            }
        });

        return "Not Found";
    });
}

export const updateEns = (id, ens, callback) => {
    axios.put(`http://localhost:4000/ens/update/${id}`, ens).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
    });
}