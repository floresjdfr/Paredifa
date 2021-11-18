import Graph from 'react-graph-vis'
import html2canvas from 'html2canvas'
import { useState, useEffect } from 'react';
import axios from 'axios';

const options = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
    },
    interaction: {
        multiselect: true
    }
};
const fetchAutomaton = async ({ username, automatonName }) => {
    try {
        const url = `http://localhost:3001/automatons/automaton/`;

        const { data } = await axios
            .post(url, { username, automatonName });

        if (data) {
            const { dfa: { node }, dfa: { edges } } = data;
            return { nodes:node, edges }
        }
        else {
            return {};
        }

    } catch (error) {
        return {};
    }
}

function Network() {


    const [state, setState] = useState({
        graph: {}
    })

    const { graph } = state;

    const events = {
        select: (nodes) => {
            console.log("Selected nodes:");
            console.log(nodes);
            alert("Selected node: " + nodes);
        }
    }
    const btnClickClear = () => setState({ graph: {} })

    const btnShow = () => {
        const fetchElement = async () => {
            const res = await fetchAutomaton({ username: '402390142', automatonName: 'pruebaConKryven' });
            console.log(res);
            setState({ graph: res })
        }
        fetchElement();
    }


    return (
        <div>
            <h1>React graph vis</h1>
            <button onClick={btnClickClear}>
                Clear
            </button>
            <button onClick={btnShow}>
                Add
            </button>
            <div id="canvas">
                {Object.keys(graph).length > 0 //Checks if graphs has elements
                    ? <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
                    : <p>El automata especificado no existe</p>}


            </div>
        </div >
    )
}

export default Network
