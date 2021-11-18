import Graph from 'react-graph-vis'
import useUserContext from '../hooks/useUserContext';

import './Canvas.css';

const options = {
    layout: {
        hierarchical: false
    },
    nodes: {
        font: { size: 24 },
        size: 64,
        color: "#F18F01",  //F18F01
        borderWidthSelected: 4,
    },
    edges: {
        width: 3,
        length: 200,
        font: {
            size: 24,
            align: "bottom",
            bold: true,
        }
    },
    interaction: {
        multiselect: true
    }
};

export const Canvas = () => {
    const { canvas, /* setCanvas */ } = useUserContext();
    const { graph } = canvas;

    const events = {
        select: (nodes) => {
            console.log("Selected nodes:");
            console.log(nodes);
            /* alert("Selected node: " + nodes); */
        }
    }

    return (
        <div className="canvas" id="canvas">
            {
                Object.keys(graph).length > 0 //Checks if graphs has elements
                    ? <Graph graph={graph} options={options} events={events} />
                    : <div></div>
            }
        </div>
    )
}
