import { Offcanvas } from "react-bootstrap";
import useUserContext from "../../hooks/useUserContext";

export const ErrorsModal = () => {
    const { errorsModalShow, setErrorsModalShow } = useUserContext();

    const handleClose = () => {
        setErrorsModalShow(false);
    }

    return (
        <Offcanvas show={errorsModalShow} onHide={handleClose} placement={"end"} scroll backdrop={false}>
            <Offcanvas.Header closeButton className="border-bottom border-2 border-secondary">
                <Offcanvas.Title className="text-danger" >Errors</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}
