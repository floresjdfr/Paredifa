import React, { createContext, useState } from 'react';
import html2canvas from 'html2canvas';

export const UserContext = createContext();

const UserProvider = ({ ...props }) => {
    const [dfaModalShow, setDfaModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [aboutModalShow, setAboutModalShow] = useState(false);
    const [instructionsModalShow, setInstructionsModalShow] = useState(false);
    const [errorsModalShow, setErrorsModalShow] = useState(false);

    // https://www.npmjs.com/package/html2canvas
    const saveCanvasPNG = e => {
        html2canvas(document.querySelector("#canvas")).then(canvas => {
            let img = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.download = 'DFA.png';
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
    }

    return <UserContext.Provider {...props} value={value} />;
}

export default UserProvider;