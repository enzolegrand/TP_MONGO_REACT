const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
const cors = require('cors');

const uriCompass = 'mongodb://localhost:27017/mon-universiteDB';

const Schema = mongoose.Schema;

const EtudSchema = new Schema({
    NumEtudiant: Number,
    Nom: String,
    Prénom: String,
    DatenET: Date
}, { versionKey: false, collection: 'Etudiants'});

const Etud = mongoose.model('Etudiants', EtudSchema);

const MatSchema = new Schema({
    CodeMat: Number,
    LibelléMat: String,
    CoefMat: Number
}, { versionKey: false, collection: 'Matiére'});

const Mat = mongoose.model('Matiére', MatSchema);

const EnsSchema = new Schema({
    CodeEns: Number,
    NomEns: String,
    PrenomEns: String,
    GradeEns: String,
    CodeMat: Number
}, { versionKey: false, collection: 'Enseignants'});

const Ens = mongoose.model('Enseignants', EnsSchema);


mongoose.connect(uriCompass).then(() => {
    console.log("Connected to database");
})

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(express.json());

//////////////////////////// Enseignants ////////////////////////////

app.get('/Enseignants', async (req, res) => {
    const enseignants = await Ens.find();
    res.send(enseignants);
});

app.delete('/ens/delete/:id', async (req, res) => {
    try {
        const ens = await Ens.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: `${ens.NomEns} is succussffully deleted` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting enseignant ${err}` })
    }
});

app.post('/ens/add', async (req, res) => {

    try {
        const newEns = new Ens({
            CodeEns: req.body.CodeEns,
            NomEns: req.body.Nom,
            PrenomEns: req.body.Prenom,
            GradeEns: req.body.Grade,
            CodeMat: req.body.CodeMat
        });

        console.log(newEns)

        await newEns.save();
        res.status(200).send({ message: `${newEns.NomEns} is succussffully added` });
    } catch (err) {
        res.status(400).send({ error: `Error adding enseignant: ${err}` });
    }
});

app.put("/ens/update/:id", async (req, res) => {
    try {
        const ens = await Ens.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true }
        );
        
        res.status(200).send({ message: `${ens.NomEns} is successfully updated` });
    } catch (err) {
        res.status(400).send({ error: `Error updating enseignant: ${err}` });
    }

});

app.get('/Etudiants', async (req, res) => {
    const students = await Etud.find();
    res.send(students);
});

app.get('/Matieres', async (req, res) => {
    const students = await Mat.find();
    res.send(students);
});

app.delete('/matiere/delete/:id', async (req, res) => {
    try {
        const mat = await Mat.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: `${mat.LibelléMat} is succussffully deleted` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting matiere ${err}` })
    }
});

app.put("/matiere/update/:id", async (req, res) => {
    try {
        const mat = await Mat.findByIdAndUpdate(
            req.params.id, 
            {
                CodeMat: req.body.CodeMat,
                LibelléMat: req.body.LibelléMat,
                CoefMat: req.body.CoefMat
            },
            { new: true }
        );
        
        res.status(200).send({ message: `${mat.LibelléMat} is successfully updated` });
    } catch (err) {
        res.status(400).send({ error: `Error updating matiere: ${err}` });
    }

});

app.post('/addMat', async (req, res) => {
    try {
        const newMat = new Mat({
            CodeMat: req.body.CodeMat,
            LibelléMat: req.body.LibelleMat,
            CoefMat: req.body.CoefMat
        });

        await newMat.save();
        res.status(200).send({ message: `${newMat.LibelléMat} is succussffully added` });
    } catch (err) {
        res.status(400).send({ error: `Error adding matiere: ${err}` });
    }
});

app.post('/add', async (req, res) => {

    try {
        const newEtud = new Etud({
            NumEtudiant: req.body.NumEtudiant,
            Nom: req.body.Nom,
            Prénom: req.body.Prénom,
            DatenET: req.body.DatenET
        });

        await newEtud.save();
        res.status(200).send({ message: `${newEtud.nom} is succussffully added` });
    } catch (err) {
        res.status(400).send({ error: `Error adding etudiant: ${err}` });
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const etud = await Etud.findByIdAndUpdate(
            req.params.id, 
            {
                NumEtudiant: req.body.NumEtudiant,
                Nom: req.body.Nom,
                Prénom: req.body.Prénom,
                DatenET: req.body.DatenET
            },
            { new: true }
        );
        
        res.status(200).send({ message: `${etud.Nom} is successfully updated` });
    } catch (err) {
        res.status(400).send({ error: `Error updating etudiant: ${err}` });
    }

});

app.delete("/delete/:id", async (req, res) => {
    try {
        const etud = await Etud.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: `${ etud.nom} is succussffully deleted` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting etudiant ${err}` })
    }
});



//////////////////////////// Notes ////////////////////////////

const NoteSchema = new Schema({
    NEtudiant: Number,
    CodeMat: Number,
    Note: Number,
    Date: Date
}, { versionKey: false, collection: 'Note'});

const Note = mongoose.model('Notes', NoteSchema);

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

app.post('/notes/add', async (req, res) => {

    try {
        const newNote = new Note(req.body);

        await newNote.save();
        res.status(200).send({ message: `Note is succussffully added` });
    } catch (err) {
        res.status(400).send({ error: `Error adding note: ${err}` });
    }
});

app.delete('/notes/delete/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: `Note is succussffully deleted` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting note ${err}` })
    }
});

app.put("/notes/update/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id, req.body,
            { new: true }
        );
        
        res.status(200).send({ message: `Note is successfully updated` });
    } catch (err) {
        res.status(400).send({ error: `Error updating note: ${err}` });
    }
});

