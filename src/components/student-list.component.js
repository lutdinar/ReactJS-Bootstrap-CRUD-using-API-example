import React, { Component } from "react";
import axios from "axios"
import Table from "react-bootstrap/Table"
import StudentTableRow from "./student-table-row";

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mahasiswa: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:1337/mahasiswa')
            .then(res => {
                this.setState({
                    mahasiswa: res.data
                });
            })
            .catch(err => console.log(err))
    }

    DataTable() {
        return this.state.mahasiswa.map((res, i) => {
            return <StudentTableRow obj={res} key={i} />
        })
    }

    render() {
        return (
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>NRP</th>
                            <th>Email</th>
                            <th>username</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DataTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default StudentList
