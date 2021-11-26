import { useEffect } from 'react';
import { Button } from "react-bootstrap";
/* import { axios } from 'axios'; */

import 'datatables.net-dt/css/jquery.dataTables.min.css';
import useGlobalContext from '../../../hooks/useGlobalContext';
/* import * as $ from 'jquery'; */
var $ = require('jquery');
$.DataTable = require('datatables.net');


/* const fetchAutomatons = async ({ username }) => {
    try {
        const url = `http://localhost:3001/automatons/automatons/`;

        const { data } = await axios
            .post(url, { username });

        if (data) {
            const { dfa } = data;
            return dfa
        }
        else {
            return [];
        }

    } catch (error) {
        return [];
    }
} */

export const AutomatonsTable = () => {
    const { automatons, readAutomatons } = useGlobalContext();

    const fetchAutomatons = async () => await readAutomatons();

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
                automatons.length === 0 ?
                    <p>Not Data Found</p> :
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
                                    <td><Button variant="dark" className="buttons" onClick={() => console.log('Display')}><i className="material-icons">visibility</i> Display</Button></td>
                                    <td><Button variant="danger" className="buttons" onClick={() => console.log('Delete')}><i className="material-icons">delete</i> Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    )
}
