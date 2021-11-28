/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

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

    const { setCanvas, setEditTransitionModalShow } = useGlobalContext();
    

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

    
    useEffect(() => {
        network.current = new Network(domNode.current, data, options);
        setCanvas({ network: network.current });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div /* onClick={findErrors} */ className="canvas" id="canvas" ref={domNode}
            
        >

        </div>
    )
}
