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
