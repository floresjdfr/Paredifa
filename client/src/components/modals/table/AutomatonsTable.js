import { useEffect, useState } from 'react';
import { Button, Alert } from "react-bootstrap";
import useGlobalContext from '../../../hooks/useGlobalContext';
import { useAuth0 } from '@auth0/auth0-react';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { updateColorForStartAndFinal } from '../../../controllers/canvas';
var $ = require('jquery');
$.DataTable = require('datatables.net');


export const AutomatonsTable = () => {
    const { automatons, readAutomatons, deleteAutomaton, canvas, setDfaModalShow, setCurrentAutomaton } = useGlobalContext();
    const { isAuthenticated } = useAuth0();
    const [alert, setAlert] = useState({ automatonName: '', show: false });

    const fetchAutomatons = async () => await readAutomatons();

    const handleDisplayAutomaton = (id) => {
        let automaton = automatons.find(automaton => automaton._id === id);

        setCurrentAutomaton(automaton);

        let { nodes, edges } = automaton;

        nodes = updateColorForStartAndFinal(nodes);

        let { network } = canvas;

        network.body.data.nodes.add(nodes);
        network.body.data.edges.add(edges);

        setDfaModalShow(false);
    }

    const handleDeleteAutomaton = (automatonName, id) => {
        deleteAutomaton(id);
        setAlert({ automatonName: automatonName, show: true });
        setTimeout(() => setAlert({ ...alert, show: false }), 2000);
    }

    useEffect(() => {
        $('#display').DataTable({
            fixedHeader: true,
            pageLength: 5,
            bLengthChange: false,
            columnDefs: [
                { "className": "dt-center", "targets": "_all" }
            ],
        });
        fetchAutomatons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="table-responsive">
            {
                isAuthenticated ?
                    automatons?.length !== 0 ?
                        <table id="display" className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Automaton Name</th>
                                    <th>Select</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody style={{ maxHeight: "300px !important" }}>
                                {automatons.map((automaton) => (
                                    <tr key={automaton._id}>
                                        <td>{automaton.automatonName}</td>
                                        <td>
                                            <Button
                                                variant="dark"
                                                className="buttons"
                                                onClick={() => handleDisplayAutomaton(automaton._id)}>
                                                <i className="material-icons">visibility</i> Display
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                className="buttons"
                                                onClick={() => handleDeleteAutomaton(automaton.automatonName, automaton._id)}>
                                                <i className="material-icons">delete</i> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <p>Not Data Found</p>
                    : <p>Please login to see the list of your automatons!</p>
            }
            <Alert show={alert.show} variant="success" transition>
                DFA: "{alert.automatonName}" has been successfully removed!
            </Alert>
        </div>
    )
}
