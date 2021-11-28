



export const allowTypeTransition = (vocabularyList = [], key = '', typedString = '') => {
    if (typedString === '' && !vocabularyList.includes(key)) return false;
    if (typedString === '' || key === null) return true;
    if (key != ',' && !isCommaBefore(typedString)) return false;
    if (vocabularyList.includes(key) || allowComma(typedString)) {
        return true;
    }
    return false;
}

const allowComma = (typeString) => { return typeString.slice(-1) != ","; }

const isCommaBefore = (typeString) => { return typeString.slice(-1) === ","; }

export const isVocabularyRegex = (vocabulary = [], setToastModal) => {
    if (vocabulary.length > 0) {
        return true
    }
    else {
        setToastModal({ message: "Please set a vocabulary before interacting with the canvas", show: true });
        return false;
    }
}

export const hasStartState = (network, errors, setErrors) => {
    let hasStartState = false;
    network.body.data.nodes.get().forEach(node => {
        if (node.start) { hasStartState = true; }
    });
    if (!hasStartState){
        let aux = errors;
        if(aux.length == 0)
            setErrors("The automaton doesn't have start state");
        else 
            setErrors(...aux, "The automaton doesn't have start state");
    }
}

export const hasFinalState = (network) => {
    let hasStartState = false;
    network.body.data.nodes.get().forEach(node => {
        if (node.final) { hasStartState = true; }
    });
    return hasStartState;
}

export const missingTransitions = (network, vocabularyArray = []) => {
    const nodes = network.body.data.nodes.get();
    const edges = network.body.data.edges.get();

    let missingTransisitionsArray = [];

    let vocabularyObj = {};

    nodes.forEach(node => {
        edges.forEach(edge => {
            if (edge.from === node.id) vocabularyObj[node.label] = edge.label;
        });
    });

    for (const property in vocabularyObj) {
        var difference = vocabularyArray.filter(x => !vocabularyObj[property].includes(x));
        if (difference.length > 0) missingTransisitionsArray.push(`State ${property}Does't have all transitions`)
    }

    return missingTransisitionsArray;

}