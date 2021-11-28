
import axios from 'axios';

export const run = async (req, res) => {
    let auxJson = prepareRequest(req.body);
    console.log(auxJson);
    await axios.post("http://localhost:9000/run", auxJson)
        .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ message: error.message })
    })
}

export const compile = async (req, res) => {
    await axios.post("http://localhost:9000/compile", req.body)
        .then((response) => {
            // console.log(response.data);
            let data = parsePrologJson(response.data);
            console.log(data);
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ message: error.message })
    })
}


function parsePrologJson(data){
    var states = data.states;
    var finals = data.finals;
    var moves = data.moves;

    var edges = new Array();
    var nodes = new Array();
    states.forEach(element => {

    let node = {
            id : element.replace('s',''),
            label : element,
            start : false,
            final : false
        }
        nodes.push(node);
    });

    let initId = data.initial.replace('s','');

    nodes.find(node => node.id === initId).start = true;
    finals.forEach(element =>{
        let finalId = element.replace('s','');
        nodes.find(node => node.id === finalId).final = true;
    });
    var contId = 1; 
    moves.forEach(element =>{
        const regex = /[s/==>]/ig;
        var datos = element.replace(regex, ',').split(",").filter(elem => elem !== "");
        let edge = {
            label : datos[1],
            from: datos[0],
            to: datos[2],
            id: contId,
            arrows: "to"
        }
        var result = validateInsert(edges,datos[0],datos[2]);
        console.log(result);
        if(result==false){
            edges.push(edge);
        }else{
            edges[result].label = edges[result].label + "," + datos[1];
        }

        contId++;
    })

    nodes = nodes.map(node => {
        return {
            id: parseInt(node.id), 
            label: node.label,
            start: node.start,
            final: node.final
        };
    });
    edges = edges.map(edge => {
        return {
            label: edge.label.replace(/'/g, ''), 
            from: parseInt(edge.from), 
            to: parseInt(edge.to),
            id: edge.id,
            arrows: edge.arrows
        };
    });
    return {nodes,edges};
}

function validateInsert(data,from,to){
    for(let i = 0; i < data.length; i++){
        if(data[i].from === from && data[i].to ===to){
            return i;
        }
    }
    return false;
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
