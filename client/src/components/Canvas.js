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

        //Verify if nodes are empty, that means the canvas is empty
        if (!graph.nodes) {
            setCanvas(() => {
                const id = 1;
                let newNode = {
                    graph: {
                        nodes: [
                            { id, label: `Node ${id}`, color, x, y }
                        ],
                        nodesCounter: id,
                        edges: [],
                        edgesCounter: 0
                    }
                }
                console.log("New node: ", newNode);
                return newNode;
            });
        }
        else {
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

    }

    const createEdge = () => {

        const convertNodeToEdge = (nodesArray, edgesCounter) => {
            let edges = []
            nodesArray.forEach((node, i) => {

                let newID = ++edgesCounter;
                edges.push({
                    id: newID,
                    from: nodesArray[0],
                    to: node,
                    label: "New Transition"
                })

            });
            return { newEdges: edges, newID: edgesCounter };
        }

        setCanvas(({ graph: { edges, edgesCounter, ...restInGraph }, selectedNodes, ...restInFA }) => {
            let { newEdges, newID } = convertNodeToEdge(selectedNodes, edgesCounter);
            let newGraph = {
                graph: {
                    edges: edges.concat(newEdges),
                    edgesCounter: newID,
                    ...restInGraph
                },
                ...restInFA
            }
            console.log("New graph: ", newGraph);
            return newGraph;
        });
    }

    const selectNodes = (nodesArray) => {
        setCanvas(({ selectedNodes, ...rest }) => {
            return { selectedNodes: nodesArray, ...rest }
        });
    }

    const deselectNodes = () => {
        setCanvas(({ selectedNodes, ...rest }) => {
            return { selectedNodes: [], ...rest }
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
            deselectNodes()
        }
    }

    return (
        <div className="canvas" id="canvas"

            onDoubleClick={(e) => {
                console.log(e);
                createNode(e.clientX, e.clientY);
            }}
            onKeyPress={(e) => {
                console.log(e);
                createEdge();
            }}
        >
            {
                Object.keys(graph).length > 0 //Checks if graphs has elements
                    && <Graph graph={graph} options={options} events={events} />
            }
        </div>
    )
}
