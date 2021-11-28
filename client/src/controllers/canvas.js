/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import * as api from '../api/index.js';
import { isVocabularyRegex, missingTransitions } from './validations.js';

/**
 * Generates a random color
 * @returns '#color'
 */
export function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

/**
 * Returns a new ID taking the last node ID added
 * @param {*} network Whole network object
 * @returns new Node ID
 */
export const getNewNodeID = (network) => { return network.body.data.nodes.length > 0 ? network.body.data.nodes.getIds().at(-1) + 1 : 1; }

/**
 * Returns a new ID taking the last edge ID added
 * @param {*} network Whole network object
 * @returns new Edge ID
 */
export const getNewEdgeID = (network) => { return network.body.data.edges.length > 0 ? network.body.data.edges.getIds().at(-1) + 1 : 1; }

/**
 * Deletes selected object
 * @param {*} network Whole network object
 */
export const deleteHandler = (network, vocabulary = [], setToastModal) => {
    if (isVocabularyRegex(vocabulary, setToastModal))
        network.deleteSelected();

};

/**
 * Activates 'adding node mode' in the canvas
 * @param {*} network Whole network object
 */
export const newStateHandler = (network, vocabulary = [], setToastModal, setErrors) => {
    if (isVocabularyRegex(vocabulary, setToastModal)){
        network.addNodeMode();
        let errors = missingTransitions(network, vocabulary);
        if (errors.length > 0) setErrors(errors);

    }
}

/**
 * Activates 'adding edge mode' in the canvas
 * @param {*} network Whole network object
 */
export const newTransitionHandler = (network, vocabulary = [], setToastModal) => {
    if (isVocabularyRegex(vocabulary, setToastModal))
        network.addEdgeMode()
};

/**
 * Sets or unsets the first selected node as 'Start Node'
 * @param {*} network 
 */
export function setStartHandler(network, vocabulary = [], setToastModal) {
    if (isVocabularyRegex(vocabulary, setToastModal)) {
        let selectedNodeId = network.getSelectedNodes().at(0);

        if (selectedNodeId) {
            let node = network.body.data.nodes.get(selectedNodeId);

            if (node.start) removeStartState(network);
            else {
                removeStartState(network);
                node.start = true;
            }

            node = updateColorForStartAndFinal([node]);
            network.body.data.nodes.update(node);
        }
    }
}
/**
 * Sets or unsets the selected nodes as 'Start Node'
 * @param {*} network 
 */
export function setFinalHandler(network, vocabulary = [], setToastModal) {
    if (isVocabularyRegex(vocabulary, setToastModal)) {
        let selectedNodesIds = network.getSelectedNodes();
        if (selectedNodesIds.length > 0) {
            let nodes = selectedNodesIds.map(node => network.body.data.nodes.get(node));
            if (nodes.length > 0) {

                nodes = nodes.map(node => {
                    (node.final) ? node.final = false : node.final = true;
                    return node;
                });
                nodes = updateColorForStartAndFinal(nodes);
                nodes.forEach(node => network.body.data.nodes.update(node));
            }
        }
    }
}


/**
 * Checks if there's a 'start' node in the network and changes that 'start state' to 'normal state'
 * @param {*} network 
 */
function removeStartState(network) {
    if (network.body.data.nodes.length > 0) {
        let startNode = network.body.data.nodes.get({ filter: function (item) { return item.start === true } });
        if (startNode.length > 0) {
            startNode[0].start = false;
            updateColorForStartAndFinal([startNode[0]]);
            network.body.data.nodes.update(startNode);
        }
    }
}

/**
 * Changes the color of the nodes if they are 'start' or 'final' states
 * @param {*} nodes 
 * @param {*} defaultColor 
 * @param {*} startColor 
 * @param {*} finalColor 
 * @returns 
 */
export const updateColorForStartAndFinal = (nodes, defaultColor = '#F18F01', startColor = '#69995D', finalColor = '#9D96B8') => {
    let result = nodes.map(node => {
        if (node.start && !node.final) node.color = startColor;
        else if (node.start && node.final) node.color = '#886176';//Cambiar en caso que sea ambos
        else if (!node.start && node.final) node.color = finalColor;
        else node.color = defaultColor;
        return node;
    });
    return result;
}

function getNodeByLabel(network, label) {
    return network.body.data.nodes.get({
        filter: function (item) {
            return (item.label === label);
        }
    })[0];
}

export function runAnimation(network, nodes = null, animationTime = 1000, animationColor = "#C7D6D5", defaultColor = "#F18F01") {

    let currentState = null;
    let lastColor = null;

    const delay = (ms) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        }, ms);
    };

    const running = async function () {
        for (var i = 0; i < nodes.length; i++) {

            //Get current setting of the node
            currentState = getNodeByLabel(network, nodes[i]);
            lastColor = currentState.color ? currentState.color : null;

            //Set animation color
            currentState.color = animationColor;
            network.body.data.nodes.update(currentState);

            /* console.log("Nodo: ", i); */

            await delay(animationTime);
            //Set animation color
            lastColor ? currentState.color = lastColor : currentState.color = defaultColor;
            network.body.data.nodes.update(currentState);

        }
    };

    running();
}

export const requestRun = async (path, network) => {

    let nodes = network.body.data.nodes.get();
    let edges = network.body.data.edges.get();
    let body = {
        dfa: {
            nodes,
            edges
        },
        path
    };
    let { data } = await api.run(body);
    return data;
};

export const isCanvasEmpty = (network) => {
    let nodes = network.body.data.nodes.get();
    let edges = network.body.data.edges.get();
    return nodes.length === 0 && edges.length === 0;
}