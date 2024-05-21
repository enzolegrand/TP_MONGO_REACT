import { getAllNote, deleteNote, updateNote, addNote } from "../services/operationNote";
import { getAll } from "../services/operationEtud";
import { getAllMatières } from "../services/operationMat";

const { Component } = require("react");

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Notes: [],
            Matieres: [],
            Etudiants: [],
            NumEtudiant: '',
            CodeMat: '',
            Note: '',
            Date: ''
        }
    }

    getNotes = () => {
        getAllNote((data) => {
            this.setState({ Notes: data });
        });
    }

    delete = (id) => {
        deleteNote(id, () => {
            this.getNotes();
        })
    }

    update = (index) => {
        let newNote = {
            NEtudiant: parseInt(this.state.Notes[index].NEtudiant),
            CodeMat: parseInt(this.state.Notes[index].CodeMat),
            Note: parseFloat(this.state.Notes[index].Note),
            Date: this.state.Notes[index].Date
        }

        updateNote(this.state.Notes[index]._id, newNote, () => {
            this.getNotes();
        });
    }

    add = () => {
        let newNote = {
            NEtudiant: parseInt(this.state.NumEtudiant),
            CodeMat: parseInt(this.state.CodeMat),
            Note: parseFloat(this.state.Note),
            Date: this.state.Date
        }

        this.setState({
            NumEtudiant: '',
            CodeMat: '',
            Note: '',
            Date: ''
        });

        addNote(newNote, () => {
            this.getNotes();
        });
    }

    componentDidMount() {
        this.getNotes();
        getAll((data) => {
            this.setState({ Etudiants: data });
        });
        getAllMatières((data) => {
            this.setState({ Matieres: data });
        });
    }

    render() {
        return(
            <div className="Note">
            <div className="table">
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%' }}>
                <thead>
                    <tr>
                        <th>Num Etudiant</th>
                        <th>Code Matière</th>
                        <th>Note</th>
                        <th>Date</th>
                        <th>Supprimer</th>
                        <th>Mettre à jour</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.state.Notes.map((note, index) => {

                            let correctDate = new Date(note.Date).toLocaleDateString();

                            if (correctDate === 'Invalid Date') {
                                correctDate = '';
                            }

                            correctDate = correctDate.split('/').reverse().join('-');

                            let student = "Etudiant introuvable";

                            this.state.Etudiants.forEach((etudiant) => {
                                if (etudiant.NumEtudiant === note.NEtudiant) {
                                    student = etudiant.Nom + ' ' + etudiant.Prénom;
                                }
                            });

                            let matiere = "Matière introuvable";

                            this.state.Matieres.forEach((mat) => {
                                if (mat.CodeMat === note.CodeMat) {
                                    matiere = mat.LibelléMat;
                                }
                            });

                            return (
                                <tr key={index}>
                                    <td>
                                        <select
                                            value={note.NEtudiant}
                                            onChange={(e) => {
                                                let updatedNotes = [...this.state.Notes];
                                                updatedNotes[index].NEtudiant = e.target.value;
                                                this.setState({ Notes: updatedNotes });
                                            }}
                                        >
                                            {this.state.Etudiants.map((etudiant, index) => (
                                                <option
                                                    key={index}
                                                    value={parseInt(etudiant.NumEtudiant)}
                                                >
                                                    {etudiant.NumEtudiant + " - " + etudiant.Nom + ' ' + etudiant.Prénom}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            value={note.CodeMat}
                                            onChange={(e) => {
                                                let updatedNotes = [...this.state.Notes];
                                                updatedNotes[index].CodeMat = e.target.value;
                                                this.setState({ Notes: updatedNotes });
                                            }}
                                        >
                                            {this.state.Matieres.map((mat, index) => (
                                                <option
                                                    key={index}
                                                    value={mat.CodeMat}
                                                >
                                                    {mat.CodeMat + " - " + mat.LibelléMat}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={note.Note}
                                            min={0}
                                            max={20}
                                            onChange={(e) => {
                                                let updatedNotes = [...this.state.Notes];
                                                updatedNotes[index].Note = e.target.value;
                                                this.setState({ Notes: updatedNotes });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={correctDate}
                                            onChange={(e) => {
                                                let updatedNotes = [...this.state.Notes];
                                                updatedNotes[index].Date = e.target.value;
                                                this.setState({ Notes: updatedNotes });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => this.delete(note._id)}>Supprimer</button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.update(index)}>Mettre à jour</button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <select
                                    value={this.state.NumEtudiant}
                                    onChange={(e) => this.setState({ NumEtudiant: e.target.value })}
                                >
                                    {this.state.Etudiants.map((etudiant, index) => (
                                        <option
                                            key={index}
                                            value={etudiant.NumEtudiant}
                                        >
                                            {etudiant.NumEtudiant + " - " + etudiant.Nom + ' ' + etudiant.Prénom}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={this.state.CodeMat}
                                    onChange={(e) => this.setState({ CodeMat: e.target.value })}
                                >
                                    {this.state.Matieres.map((mat, index) => (
                                        <option
                                            key={index}
                                            value={mat.CodeMat}
                                        >
                                            {mat.CodeMat + " - " + mat.LibelléMat}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Note"
                                    min={0}
                                    max={20}
                                    value={this.state.Note}
                                    onChange={(e) => this.setState({ Note: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    value={this.state.Date}
                                    onChange={(e) => this.setState({ Date: e.target.value })}
                                />
                            </td>
                            <td>
                                <button onClick={() => {
                                    let newNote = {
                                        NEtudiant: parseInt(this.state.NumEtudiant),
                                        CodeMat: parseInt(this.state.CodeMat),
                                        Note: parseFloat(this.state.Note),
                                        Date: this.state.Date
                                    }

                                    this.add(newNote, () => {
                                        this.getNotes();
                                    });
                                }}>Ajouter</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default Note;