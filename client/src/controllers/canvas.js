export function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

export function getNewNodeID(network) {
    return network.body.data.nodes.length > 0 ? network.body.data.nodes.getIds().at(-1) + 1 : 1;
}

export function getNewEdgeID(network) {
    return network.body.data.edges.length > 0 ? network.body.data.edges.getIds().at(-1) + 1 : 1;
}

export function deleteHandler(network) {
    network.deleteSelected();
}

export function newStateHandler(network) {
    network.addNodeMode({ color: 1 });
}

export function newTransitionHandler(network) {
    network.addEdgeMode();
}

export function setStartHandler(network) {
    let selectedNodeId = network.getSelectedNodes().at(0);
    if (selectedNodeId) {
        let node = network.body.data.nodes.get(selectedNodeId);
        if (node) {
            node.start = true;
            node.final = false;
        }
    }
}

const updateColorForStartAndFinal = (nodes, startColor = '#69995D', finalColor = '#9B2915') => {
    return nodes.map(node => {
        return node.start
            ? { color: startColor, ...node }
            : node.final
                ? { color: finalColor, ...node }
                : { ...node };
    })
}


export function addNode(setCanvas, network) {
    let color = randomColor();

    //Creates a new ID adding 1 to the last ID
    let newID = network.body.data.nodes.length > 0 ? network.body.data.nodes.getIds().at(-1) + 1 : 1;
    network.body.data.nodes.add({ id: newID, label: `S${newID}`, color });
    setCanvas({ network })
}

export function addEdgeAction(setCanvas, network) {
    let selectedNodes = network.getSelectedNodes();
    let lastNodeId = network.body.data.edges.length > 0 ? network.body.data.edges.getIds().at(-1) : 0;
    if (selectedNodes.length > 1) {
        selectedNodes.forEach((nodeID, i) => {
            i !== 0 && network.body.data.edges.add({ id: ++lastNodeId, from: selectedNodes[0], to: nodeID, arrows: "to" });
        });
    } else {
        network.body.data.edges.add({ id: ++lastNodeId, from: selectedNodes[0], to: selectedNodes[0], arrows: "to" });
    }
    setCanvas({ network });
}

export function deleteEdgeAction(setCanvas, network) {
    let selectedNodes = network.getSelectedNodes();
    let selectedEdges = network.getSelectedEdges();
    selectedNodes.forEach(nodeId => {
        network.body.data.nodes.remove(nodeId);
    })
    selectedEdges.forEach(edgeId => {
        network.body.data.edges.remove(edgeId);
    })
    setCanvas({ network });
}