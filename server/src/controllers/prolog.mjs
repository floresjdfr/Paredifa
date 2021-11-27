
import axios from 'axios';

/* export const run = async (req, res) => {
    let auxJson = prepareRequest(req.body);
    axios.post("http://localhost:9000/run", auxJson)
        .then(response => {
            const aux = response.data;
            res.json(aux);
            console.log(aux);
            // console.log(res);
            // console.log(response);
        });
} */

export const run = async (req, res) => {
    let auxJson = prepareRequest(req.body);

    axios.post("http://localhost:9000/run", auxJson)
        .then((response) => res.status(200).json(response.data))
        .catch((error) => res.status(404).json({ message: error.message }))
}

function prepareRequest({ path, dfa }) {
    let json = {
        path: path.split(""),
        fa: parseJson(dfa)
    };

    return json;
}

function parseJson(data) {

    var nodes = data.nodes;
    var edges = data.edges;
    var finals = new Array();
    var states = new Array();
    var moves = new Array();
    var initial;
    var vocabulary = new Array()
    nodes.forEach(element => {
        states.push(element.label);
        if (element.final) {
            finals.push(element.label);
        }
        if (element.start) {
            initial = element.label;
        }
    });
    edges.forEach(element => {
        let from = nodes.find(node => node.id === element.from).label;
        let to = nodes.find(node => node.id === element.to).label;
        let symbol = element.label;
        if (symbol.length === 1) {
            moves.push(parseMove(from, to, symbol));
        } else {
            let symbols = symbol.split(',');
            symbols.forEach(element => {
                moves.push(parseMove(from, to, element))
            })
        }
        vocabulary.push(symbol);

    });

    return { finals, states, moves, vocabulary, initial };
}

function parseMove(from, to, symbol) {
    return from + '/' + symbol + '==>' + to;
}
