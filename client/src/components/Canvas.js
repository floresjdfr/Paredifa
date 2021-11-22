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
            align: "bottom"
        },
        smooth: {
            type: "curvedCCW",
        }
    },
    interaction: {
        multiselect: true
    },

};

function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}



export const Canvas = () => {
    const { canvas, setCanvas } = useUserContext();
    const { graph } = canvas;

    const createNode = (x, y) => {
        const color = randomColor();
        setCanvas(({ graph: { nodes, edges, nodesCounter, ...restInGraph }, ...restInFA }) => {
            const id = nodesCounter + 1;
            const from = Math.floor(Math.random() * (nodesCounter - 1)) + 1;
            let newNode = {
                graph: {
                    nodes: [
                        ...nodes,
                        { id, label: `Node ${id}`, color, x, y }
                    ],
                    edges: [
                        ...edges,
                    ],
                    nodesCounter: id,
                    ...restInGraph
                },
                ...restInFA
            }
            console.log("New node: ", newNode);
            return newNode;
        });
    }

    const selectNodes = (nodesArray) => {
        setCanvas(({selectedNodes, ...rest}) => {
          return {selectedNodes:nodesArray, ...rest}  
        });
    }

    const deselectNodes = () => {
        setCanvas(({selectedNodes, ...rest}) => {
            return {selectedNodes:[], ...rest}  
          });
    }

    const events = {
        selectNode: ({ nodes }) => {
            console.log("Selected nodes:");
            console.log(nodes);
            selectNodes(nodes)
            /* alert("Selected node: " + nodes); */
        },
        deselectNode: (nodes) => {
            console.log("Deselected nodes:");
            deselectNodes()
        },
        doubleClick: ({ pointer: { canvas } }) => {
            createNode(canvas.x, canvas.y);
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
