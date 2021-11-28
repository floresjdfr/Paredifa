/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { ToastContainer, Toast } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";

export const ToastModal = () => {
    const { toastModal, setToastModal } = useGlobalContext();

    return (
        <ToastContainer className="p-3" position='middle-center'>
            <Toast onClose={() => setToastModal({ ...toastModal, show: false })} show={toastModal.show} delay={3200} autohide>
                <Toast.Header>
                    <strong className="me-auto">Feedback</strong>
                    <small>A few seconds ago</small>
                </Toast.Header>
                <Toast.Body>{toastModal.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
