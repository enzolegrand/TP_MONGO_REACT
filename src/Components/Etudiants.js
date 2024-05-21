import React, { Component } from 'react';
import { getAll, add, remove, update } from '../services/operationEtud';
import '../styles/etudiants.css';

class Etudiants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Etuds: [],
            prenom: '',
            nom: '',
            date: '',
            id: ''
        }
    }

    getEtudiants = () => {
        getAll((data) => {
            this.setState({ Etuds: data });
        });
    }


    updateEtud = (id, firstname, lastname, birthdate) => {
        let newEtud = {
            NumEtudiant: id,
            Nom: lastname,
            Prénom: firstname,
            DatenET: birthdate
        }

        this.setState({
            prenom: '',
            nom: '',
            id: '',
            date: ''
        });

        update(id, newEtud, () => {
            this.getEtudiants();
        });
    }

    addEtud = (id, firstname, lastname, birthdate) => {

        let parsedInt = parseInt(id);

        if (isNaN(parsedInt)) {
            id = this.state.Matieres.length + 1;
        }

        let newEtud = {
            NumEtudiant: id,
            Nom: lastname,
            Prénom: firstname,
            DatenET: birthdate
        }

        this.setState({
            prenom: '',
            nom: '',
            id: '',
            date: ''
        });

        add(newEtud, () => {
            this.getEtudiants();
        });
    }

    componentDidMount() {
        this.getEtudiants();
    }

    render() {
        return (
            <div className='Etudiants'>
                <div className="table">
                    <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '80%' }}>
                        <thead>
                            <tr>
                                <th>NumEtudiant</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Date de naissance</th>
                                <th>Supprimer</th>
                                <th>Mettre à jour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Etuds.map((etudiant, index) => {
                                return (
                                    <tr key={index}>
                                        <td><input type="text" placeholder='NumEtudiant' value={this.state.Etuds[index].NumEtudiant} onChange={(e) => {
                                            let updatedEtuds = [...this.state.Etuds];
                                            updatedEtuds[index].NumEtudiant = e.target.value;
                                            this.setState({ Etuds: updatedEtuds });
                                        }} /></td>
                                        <td><input type="text" placeholder='Nom' value={etudiant.Nom} onChange={(e) => {
                                            let updatedEtuds = [...this.state.Etuds];
                                            updatedEtuds[index].Nom = e.target.value;
                                            this.setState({ Etuds: updatedEtuds });
                                        }} /></td>
                                        <td><input type="text" placeholder='Prénom' value={etudiant.Prénom} onChange={(e) => {
                                            let updatedEtuds = [...this.state.Etuds];
                                            updatedEtuds[index].Prénom = e.target.value;
                                            this.setState({ Etuds: updatedEtuds });
                                        }} /></td>
                                        <td><input type="text" placeholder='Date de naissance' value={etudiant.DatenET} onChange={(e) => {
                                            let updatedEtuds = [...this.state.Etuds];
                                            updatedEtuds[index].DatenET = e.target.value;
                                            this.setState({ Etuds: updatedEtuds });
                                        }} /></td>
                                        <td><button onClick={() => remove(etudiant._id, () => this.getEtudiants())}>X</button></td>
                                        <td><button onClick={() => update(etudiant._id, this.state.Etuds[index], () => this.getEtudiants())}>Mettre à jour</button></td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td><input type="text" placeholder="NumEtudiant" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} /></td>
                                <td><input type="text" placeholder="Nom" value={this.state.nom} onChange={(e) => this.setState({ nom: e.target.value })} /></td>
                                <td><input type="text" placeholder="Prénom" value={this.state.prenom} onChange={(e) => this.setState({ prenom: e.target.value })} /></td>
                                <td><input type="date" placeholder="Date de naissance" value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })} /></td>
                                <td><button onClick={() => this.addEtud(this.state.id, this.state.prenom, this.state.nom, this.state.date)}>Ajouter</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Etudiants;
