/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { Offcanvas } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";

export const ErrorsModal = () => {
    const { errorsModalShow, setErrorsModalShow, errors } = useGlobalContext();

    const handleClose = () => {
        setErrorsModalShow(false);
    }

    return (
        <Offcanvas show={errorsModalShow} onHide={handleClose} placement={"end"} scroll backdrop={false}>
            <Offcanvas.Header closeButton className="border-bottom border-2 border-secondary">
                <Offcanvas.Title className="text-info" >Information</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    errors.length !== 0 ?
                        errors.map((error, index) => (
                            <p key={index}>{index+1}: {error}</p>
                        )) :
                        <p> There are no problems, automaton is OK!</p>
                }
            </Offcanvas.Body>
        </Offcanvas >
    )
}
