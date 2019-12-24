import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios"

class StudentTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this)
    }

    deleteMhs(mshId) {
        axios.delete('http://localhost:1337/mahasiswa/'+mshId)
            .then(res => console.log('Student successfully deleted with : '+res.data))
            .catch(err => console.warn(err));
    }

    deleteStudent() {
        axios.delete('http://localhost:1337/users/'+this.props.obj.users.id)
            .then(res => {
                console.log('Student Account successfully deleted with : '+res.data)
                this.deleteMhs(this.props.obj.id)
            })
            .catch(err => console.warn(err));
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.nama}</td>
                <td>{this.props.obj.nrp}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.users.username}</td>
                <td>
                    <Link className="btn btn-sm btn-primary" to={"/edit-student/"+this.props.obj.id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }
}

export default StudentTableRow
