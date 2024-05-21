import { getAllEns, addEns, deleteEns, updateEns } from "../services/operationEns";
import { getAllMatières } from "../services/operationMat";

const { Component } = require("react");

class Enseignants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Enseignants: [],
            Matieres: [],
            CodeEns: '',
            Nom: '',
            Prénom: '',
            Grade: '',
            CodeMat: ''
        }
    }

    getEnseignants = () => {
        getAllEns((data) => {
            this.setState({ Enseignants: data });
        });
    }

    getAllMatières = () => {
        getAllMatières((data) => {
            this.setState({ Matieres: data });
        });
    }

    componentDidMount() {
        this.getEnseignants();
        this.getAllMatières();
    }

    add = () => {
        let newEtud = {
            CodeEns: this.state.CodeEns,
            Nom: this.state.Nom,
            Prenom: this.state.Prénom,
            Grade: this.state.Grade,
            CodeMat: this.state.CodeMat
        }

        this.setState({
            CodeEns: '',
            Nom: '',
            Prénom: '',
            Grade: '',
            CodeMat: ''
        });

        addEns(newEtud, () => {
            this.getEnseignants();
        });
    }

    delete = (id) => {
        deleteEns(id, () => {
            this.getEnseignants();
        });
    }

    update = (id) => {
        updateEns(this.state.Enseignants[id]._id, this.state.Enseignants[id], () => {
            this.getEnseignants();
        });
    }


    render() {

        return (
            <div className="Enseignants">
                <div className="table">
                    <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%' }}>
                        <thead>
                            <tr>
                                <th>Code Enseignant</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Grade</th>
                                <th>Code matière</th>
                                <th>Action 1</th>
                                <th>Action 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Enseignants.map((ens, index) => {

                                let codeMatiereEns = ens.CodeMat;
                                
                                if (this.state.Matieres.length === 0) {
                                    return;
                                }

                                let matiere = "Not Found"

                                this.state.Matieres.forEach((mat) => {
                                    if (mat.CodeMat === codeMatiereEns) {
                                        matiere = mat.LibelléMat;
                                    }
                                });

                                return (
                                    <tr key={index}>
                                        <td><input type="text" value={this.state.Enseignants[index].CodeEns} onChange={
                                            (e) => {
                                                let updatedEns = [...this.state.Enseignants];
                                                updatedEns[index].CodeEns = e.target.value;
                                                this.setState({ Enseignants: updatedEns });
                                            }}/>
                                        </td>

                                        <td><input type="text" value={this.state.Enseignants[index].NomEns} onChange={
                                            (e) => {
                                                let updatedEns = [...this.state.Enseignants];
                                                updatedEns[index].NomEns = e.target.value;
                                                this.setState({ Enseignants: updatedEns });
                                            }}/>
                                        </td>

                                        <td><input type="text" value={this.state.Enseignants[index].PrenomEns} onChange={
                                            (e) => {
                                                let updatedEns = [...this.state.Enseignants];
                                                updatedEns[index].PrenomEns = e.target.value;
                                                this.setState({ Enseignants: updatedEns });
                                            }}/>
                                        </td>

                                        <td><input type="text" value={this.state.Enseignants[index].GradeEns} onChange={
                                            (e) => {
                                                let updatedEns = [...this.state.Enseignants];
                                                updatedEns[index].GradeEns = e.target.value;
                                                this.setState({ Enseignants: updatedEns });
                                            }}/>
                                        </td>

                                        <td><select value={this.state.Enseignants[index].CodeMat} onChange={
                                            (e) => {
                                                let updatedEns = [...this.state.Enseignants];
                                                updatedEns[index].CodeMat = e.target.value;
                                                this.setState({ Enseignants: updatedEns });
                                            }}>
                                            {this.state.Matieres.map((mat, index) => {
                                                return (
                                                    <option key={index} value={mat.CodeMat}>{mat.CodeMat + " - " + mat.LibelléMat}</option>
                                                );
                                            })}
                                        </select>
                                        </td>
                                        <td><button onClick={() => this.delete(ens._id)}>Supprimer</button></td>
                                        <td><button onClick={() => this.update(index)}>Mettre à jour</button></td>
                                    </tr>
                                );
                            })}

                            <tr>
                                <td><input type="text" placeholder="Code Enseignant" value={this.state.CodeEns} onChange={(e) => this.setState({ CodeEns: e.target.value})}/></td>
                                <td><input type="text" placeholder="Nom" value={this.state.Nom} onChange={(e) => this.setState({ Nom: e.target.value})}/></td>
                                <td><input type="text" placeholder="Prénom" value={this.state.Prénom} onChange={(e) => this.setState({ Prénom: e.target.value})}/></td>
                                <td><input type="text" placeholder="Grade" value={this.state.Grade} onChange={(e) => this.setState({ Grade: e.target.value})}/></td>
                                <td><select value={this.state.CodeMat} onChange={(e) => this.setState({ CodeMat: e.target.value})}>
                                    {this.state.Matieres.map((mat, index) => {
                                        return (
                                            <option key={index} value={mat.CodeMat}>{mat.CodeMat + " - " + mat.LibelléMat}</option>
                                        );
                                    })}
                                </select></td>
                                <td><button onClick={() => this.add()}>Ajouter</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Enseignants;