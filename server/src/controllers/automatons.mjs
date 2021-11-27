import mongoose from 'mongoose';

import automatonModel from "../models/automatons.mjs";

/* ====================================CREATE==================================== */

export const createAutomaton = (req, res) => {
    const automaton = automatonModel(req);

    automaton
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(409).json({ message: error.message }));
}

export const addAutomaton = async (req, res) => {
    const { userID, newAutomaton } = req.body;

    try {
        const automaton = await automatonModel.findOne({ userID: userID });

        if (!automaton) {
            createAutomaton({ userID: userID, dfa: [newAutomaton] }, res);
        } else {
            automaton.dfa = [...automaton.dfa, newAutomaton];

            const newRecord = await automaton.save();

            if (newRecord === automaton) res.status(201).json({ userID: userID, dfa: [newAutomaton] });
        }
    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}

/* =====================================READ===================================== */

export const getAutomatons = (req, res) => {
    automatonModel
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: error.message }))
}

export const readAutomatons = (req, res) => {
    const { userID } = req.params;

    automatonModel
        .find({ userID: userID }, 'dfa')
        .then((data) => res.status(200).json(data.length != 0 ? data[0].dfa : null))
        .catch((error) => res.status(404).json({ message: error.message }))
}

export const readAutomaton = async (req, res) => {
    const { userID, autName } = req.params;

    try {
        const automaton = await automatonModel
            .aggregate()
            .match({ userID: userID })
            .unwind('dfa')
            .match({ 'dfa.automatonName': autName });

        res.status(200).json(automaton.length != 0 ? automaton[0].dfa : null);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* ====================================UPDATE==================================== */

export const updateAutomaton = (req, res) => {
    const { userID, autName } = req.params;
    const { updateAutomaton } = req.body;

    automatonModel
        .findOneAndUpdate(
            { userID: userID, "dfa.automatonName": autName },
            { $set: { "dfa.$": updateAutomaton } },
            { new: true, setDefaultsOnInsert: true }
        )
        .then(() => res.json(updateAutomaton))
        .catch((error) => res.status(404).json({ message: error.message }))
}

/* ====================================DELETE==================================== */
//https://docs.mongodb.com/manual/reference/operator/update/pull/
export const deleteAutomaton = async (req, res) => {
    const { userID, autId } = req.params;

    try {
        await automatonModel.findOneAndUpdate(
            { userID: userID },
            { $pull: { dfa: { _id: autId } } },
            { safe: true, multi: false }
        );

        res.status(200).json(autId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}