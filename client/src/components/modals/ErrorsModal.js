/* import { useEffect } from "react"; */
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
                <Offcanvas.Title className="text-danger" >Errors</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    errors.length !== 0 ?
                        errors.map((error, index) => (
                            <p key={index}>{index}: {error}</p>
                        )) :
                        <p> There are no problems, automaton is OK!</p>
                }
            </Offcanvas.Body>
        </Offcanvas >
    )
}
