import { Component } from "react";
import { getAllMatières, deleteMat, updateMat, addMat } from "../services/operationMat.js";

class Matière extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Matieres: [],
            code: '',
            libelle: '',
            coefficient: '',
            id: ''
        }
    }

    getMatieres = () => {
        getAllMatières((data) => {
            this.setState({ Matieres: data });
        });
    }

    delete = (id) => {
        deleteMat(id, () => {
            this.getMatieres();
        });
    }

    update = (index) => {

        let newMat = {
            CodeMat: this.state.Matieres[index].CodeMat,
            LibelléMat: this.state.Matieres[index].LibelléMat,
            CoefMat: this.state.Matieres[index].CoefMat
        }

        updateMat(this.state.Matieres[index]._id, newMat, () => {
            this.getMatieres();
        });

   }

   addMatière = (code, libelle, coefficient) => {

    let parsedInt = parseInt(code);

    if (isNaN(parsedInt)) {
        code = this.state.Matieres.length + 1;
    }

    console.log(typeof code);
        let newMat = {
            CodeMat: code,
            LibelleMat: libelle,
            CoefMat: coefficient
        }

        console.log(newMat);

        this.setState({
            code: '',
            libelle: '',
            coefficient: ''
        });

        addMat(newMat, () => {
            this.getMatieres();
        });
   }


    componentDidMount() {
        this.getMatieres();
    }

    render() {
        return (
            <div className="Matiere">
                <div className="table">
                    <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%' }}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Libellé</th>
                                <th>Coefficient</th>
                                <th>Supprimer</th>
                                <th>Mettre à jour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Matieres.map((mat, index) => {
                                return (
                                    <tr key={mat._id}>
                                        <td><input type="number" placeholder="CodeMat" value={this.state.Matieres[index].CodeMat} onChange={
                                            (e) => {
                                                let updatedMat = [...this.state.Matieres];
                                                updatedMat[index].CodeMat = e.target.value;
                                                this.setState({ Matieres: updatedMat });
                                            }
                                        } /></td>
                                        <td><input type="text" placeholder="LibelléMat" value={this.state.Matieres[index].LibelléMat} onChange={
                                            (e) => {
                                                let updatedMat = [...this.state.Matieres];
                                                updatedMat[index].LibelléMat = e.target.value;
                                                this.setState({ Matieres: updatedMat });
                                            }
                                        } /></td>
                                        <td><input type="text" placeholder="CoefMat" value={this.state.Matieres[index].CoefMat} onChange={
                                            (e) => {
                                                let updatedMat = [...this.state.Matieres];
                                                updatedMat[index].CoefMat = e.target.value;
                                                this.setState({ Matieres: updatedMat });
                                            }
                                        } /></td>
                                        <td><button onClick={() => this.delete(mat._id)}>Supprimer</button></td>
                                        <td><button onClick={() => this.update(index)}>Mettre à jour</button></td>
                                    </tr>
                                );
                            })}
                            <tr key="addMat">
                                <td><input type="text" placeholder="CodeMat" value={this.state.code} onChange={(e) => this.setState({ code: e.target.value })} /></td>
                                <td><input type="text" placeholder="LibelléMat" value={this.state.libelle} onChange={(e) => this.setState({ libelle: e.target.value })} /></td>
                                <td><input type="text" placeholder="CoefMat" value={this.state.coefficient} onChange={(e) => this.setState({ coefficient: e.target.value })} /></td>
                                <td><button onClick={() => this.addMatière(this.state.code, this.state.libelle, this.state.coefficient)}>Ajouter</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Matière;