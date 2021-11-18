import { useEffect } from 'react';
import { Button } from "react-bootstrap";
import 'datatables.net-dt/css/jquery.dataTables.min.css';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const fetchAutomatons = async ({ username }) => {
    try {
        const url = `http://localhost:3001/automatons/automatons/`;

        const { data } = await axios
            .post(url, { username });

        if (data) {
            const { dfa } = data;
            return { nodes:node, edges }
        }
        else {
            return {};
        }

    } catch (error) {
        return {};
    }
}

export const DFATable = () => {
    useEffect(() => {
        $('#display').DataTable({
            fixedHeader: true,
            pageLength: 5,
            bLengthChange: false,
            columnDefs: [
                { "className": "dt-center", "targets": "_all" }
            ],
        });
    }, []);

    return (
        <div className="table-responsive">
            <table id="display" className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Automaton Name</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody style={{ maxHeight: "300px !important" }}>
                    <tr>
                        <td>Automaton 1</td>
                        <td><Button variant="dark" className="buttons" onClick={() => console.log('Display')}><i className="material-icons">visibility</i> Display</Button></td>
                    </tr>
                    <tr>
                        <td>Automaton 2</td>
                        <td><Button variant="dark" className="buttons"><i className="material-icons">visibility</i> Display</Button></td>
                    </tr>
                    <tr>
                        <td>Automaton 3</td>
                        <td><Button variant="dark" className="buttons"><i className="material-icons">visibility</i> Display</Button></td>
                    </tr>
                    <tr>
                        <td>Automaton 4</td>
                        <td><Button variant="dark" className="buttons"><i className="material-icons">visibility</i> Display</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
