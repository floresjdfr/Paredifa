import React, { createContext, useState } from 'react';
import html2canvas from 'html2canvas';

export const UserContext = createContext();

const UserProvider = ({ ...props }) => {
    const [dfaModalShow, setDfaModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [aboutModalShow, setAboutModalShow] = useState(false);
    const [instructionsModalShow, setInstructionsModalShow] = useState(false);
    const [errorsModalShow, setErrorsModalShow] = useState(false);

    const [canvas, setCanvas] = useState({ graph: {}, selectedNodes: [], selectedEdges: [] });
    const [userName, setUserName] = useState('');
    const [automatonName, setAutomatonName] = useState('');

    // https://www.npmjs.com/package/html2canvas
    const saveCanvasPNG = e => {
        html2canvas(document.querySelector("#canvas")).then(canvas => {
            let img = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.download = automatonName + '.png';
            link.href = img;
            link.click();
        });
    }

    const value = {
        dfaModalShow,
        setDfaModalShow,
        confirmModalShow,
        setConfirmModalShow,
        aboutModalShow,
        setAboutModalShow,
        instructionsModalShow,
        setInstructionsModalShow,
        saveCanvasPNG,
        errorsModalShow,
        setErrorsModalShow,
        canvas,
        setCanvas,
        userName,
        setUserName,
        automatonName,
        setAutomatonName,
    }

    return <UserContext.Provider {...props} value={value} />;
}

export default UserProvider;