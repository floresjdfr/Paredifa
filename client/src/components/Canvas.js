import useGlobalContext from '../hooks/useGlobalContext';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { useEffect, useRef } from 'react';
import { getNewNodeID, getNewEdgeID } from '../controllers/canvas'
import './Canvas.css';

const nodes = new DataSet([]);

const edges = new DataSet([]);

const data = {
    nodes,
    edges
};

export const Canvas = () => {

    const { setCanvas, setEditTransitionModalShow, errors, setErrors } = useGlobalContext();

    const domNode = useRef(null);
    const network = useRef(null);

    const options = {
        layout: {
            hierarchical: false,
        },
        nodes: {
            font: { size: 24 },
            size: 64,
            color: "#F18F01",  //F18F01
            borderWidthSelected: 4,
        },
        edges: {
            width: 2,
            length: 200,
            font: {
                size: 18,
                align: "bottom"
            },
            smooth: {
                type: "curvedCCW",
            },
            color: {
                inherit: false,
            }
        },
        interaction: {
            multiselect: true,
            selectConnectedEdges: false
        },
        manipulation: {
            enabled: false,
            addNode: function (data, callback) {
                let id = getNewNodeID(network.current);

                data.id = id;
                data.label = `s${id}`;
                callback(data);
                delete data.x;
                delete data.y;
                network.current.body.data.nodes.update(data);

            },
            addEdge: async function (data, callback) {
                let id = getNewEdgeID(network.current);
                data.id = id;
                //todo
                // data.label = prompt();
                // data.label = `${id}`;
                data.arrows = "to";
                callback(data);
                setCanvas(() => {
                    return {
                        network: network.current,
                        lastItem: id
                    }
                })
                setEditTransitionModalShow(true);

            }
        }
    };

    //stata:{network:network}

    /* const findErrors = () => {
        let nodes = network.current.body.data.nodes.get();
        let edges = network.current.body.data.edges.get();

        if (nodes.length !== 0) {
            let start = nodes.find((node) => node.start === true);
            let final = nodes.find((node) => node.final === true);

            if (!start) {
                setErrors([...errors, 'There is no starting node'])

            } else {
                setErrors(errors.filter((error) => error !== 'There is no starting node'))
            }

            if (!final) {
                setErrors([...errors, 'There is no final node'])
            } else {
                setErrors(errors.filter((error) => error !== 'There is no final node'))
            }





        }
    } */

    useEffect(() => {
        network.current = new Network(domNode.current, data, options);
        setCanvas({ network: network.current });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div /* onClick={findErrors} */ className="canvas" id="canvas" ref={domNode}
            onKeyPress={(e) => {
                switch (e.code) {
                    case 'KeyE':
                        network.current.enableEditMode();
                        break;
                    case 'KeyA':
                        network.current.addNodeMode();
                        break;
                    case 'KeyB':
                        network.current.addEdgeMode();
                        break;
                    default:
                        break;
                }
            }}
        >

        </div>
    )
}
