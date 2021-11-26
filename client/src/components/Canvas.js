import useUserContext from '../hooks/useUserContext';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network'
import { useEffect, useRef } from 'react';
import { addNode, addEdgeAction, deleteEdgeAction, randomColor, getNewNodeID, getNewEdgeID } from '../controllers/canvas'
import './Canvas.css';



const nodes = new DataSet([]);

const edges = new DataSet([]);

const data = {
    nodes,
    edges
};


export const Canvas = () => {

    const { canvas, setCanvas, setEditTransitionModalShow } = useUserContext();

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
                setCanvas(() =>{
                    return {
                        network: network.current,
                        lastItem: id
                    }
                })
                
            },
            addEdge: async function (data, callback) {
                let id = getNewEdgeID(network.current);
                data.id = id;
                //todo
                // data.label = prompt();
                // data.label = `${id}`;
                data.arrows = "to";
                callback(data);
                setCanvas(() =>{
                    return {
                        network: network.current,
                        lastItem: id
                    }
                })
                setEditTransitionModalShow(true);
                
            }
        }
    };

    useEffect(() => {
        network.current = new Network(domNode.current, data, options);
        
        network.current.on('oncontext', ({ event }) => {
            event.preventDefault();
            
        });
        setCanvas({ network: network.current });
    }, []);


    const createNode = () => {
        addNode(setCanvas, network.current);
    }
    const addEdge = () => {
        addEdgeAction(setCanvas, network.current);
    }
    const removeNode = () => {
        deleteEdgeAction(setCanvas, network.current);
    }

    
    return (
        <div className="canvas" id="canvas" ref={domNode}
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
