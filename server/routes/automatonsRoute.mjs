import express from 'express';
import { addAutomaton, updateAutomaton, readAutomaton, readAutomatons } from '../database/CRUD/automatonCRUD.mjs';

const router = express.Router();
export default router;

router.post('/automatons', async (req, res) => {

    let json = req.body;
    const { username } = json;

    await readAutomatons(username, (data, error) => {
        res.json(data);
    });
});


router.post('/automaton', async (req, res) => {

    let json = req.body;
    const { username, automatonName } = json;

    await readAutomaton(username, automatonName, (data, error) => {
        res.json(data);
    })

});

router.post('/update-automaton', async (req, res) => {
    let json = req.body;
    const { username, automatonName, newAutomaton } = json;

    await updateAutomaton(username, automatonName, newAutomaton, (data, error) => {
        res.json(data);
    });
});

router.post('/add-automaton', async (req, res) => {
    let json = req.body;
    const {username, newAutomaton} = json;

    await addAutomaton(username, newAutomaton, (data, error) => {
        res.json(data);
    });
});




