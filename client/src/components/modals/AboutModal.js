import { useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";

export const AboutModal = () => {
    const { aboutModalShow, setAboutModalShow, aboutUs, readAboutUs } = useGlobalContext();

    const handleClose = () => {
        setAboutModalShow(false);
    };

    useEffect(() => {
        readAboutUs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal
            show={aboutModalShow}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    About Us
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                {
                    Object.entries(aboutUs).length === 0 ?
                        <Spinner animation="border" /> :
                        <div>
                            <p className="text-center fw-bold">{aboutUs.university}</p>
                            <p className="text-center fw-bold">{aboutUs.school}</p>
                            <p className="text-center fw-bold">{aboutUs.course}</p>
                            <p className="text-center fw-bold">{aboutUs.professor}</p>
                            <p className="text-center fw-bold">{aboutUs.cycle}</p>
                            <p className="text-center fw-bold">Authors:</p>
                            {aboutUs.authors.map((author) => (
                                <p key={author.id}>ID: {author.id} - {author.name} - {author.hour}</p>
                            ))}
                            <p className="text-center fw-bold">Group: {aboutUs.group}</p>
                            <p className="text-center fw-bold">Version {aboutUs.version}</p>
                        </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
