import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from "react-router-dom";

class EditStudent extends Component {
    constructor(props) {
        super(props);

        // setting up function
        this.onChangeFullnameStudent = this.onChangeFullnameStudent.bind(this)
        this.onChangeEmailStudent = this.onChangeEmailStudent.bind(this)
        this.onChangeNrpStudent = this.onChangeNrpStudent.bind(this)
        this.onChangeUsernameStudent = this.onChangeUsernameStudent.bind(this)
        this.onChangePasswordStudent = this.onChangePasswordStudent.bind(this)
        this.onChangeRoleStudent = this.onChangeRoleStudent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        // setting up state
        this.state = {
            fullname: '',
            email: '',
            nrp: '',
            username: '',
            password: '',
            role: '',
            userId: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:1337/mahasiswa/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    fullname: res.data.nama,
                    email: res.data.email,
                    nrp: res.data.nrp,
                    username: res.data.users.username,
                    password: res.data.users.password,
                    role: res.data.users.role,
                    userId: res.data.users.id
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeFullnameStudent(e) {
        this.setState({fullname: e.target.value})
    }

    onChangeEmailStudent(e) {
        this.setState({email: e.target.value})
    }

    onChangeNrpStudent(e) {
        this.setState({nrp: e.target.value})
    }

    onChangeUsernameStudent(e) {
        this.setState({username: e.target.value})
    }

    onChangePasswordStudent(e) {
        this.setState({password: e.target.value})
    }

    onChangeRoleStudent(e) {
        this.setState({role: e.target.value})
    }

    putMhs(nama, email, nrp, userId) {
        axios.put('http://localhost:1337/mahasiswa/'+this.props.match.params.id, null, { params: {
                nama: nama,
                email: email,
                nrp: nrp,
                userId: userId
            }})
            .then(res => console.log(res.data))
            .catch(err => console.warn(err));
    }

    onSubmit(e) {
        e.preventDefault()

        axios.put('http://localhost:1337/users/'+this.state.userId, null, { params: {
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }}).then(res => {
            if (res.status === 500) {
                console.log(res.data);
            } else if (res.status === 200) {
                this.putMhs(this.state.fullname, this.state.email, this.state.nrp, this.state.userId);
            } else {
                console.log("Server error with : "+res.data);
            }
        }).catch(err => console.warn(err));

        // Redirect to Student List
        this.props.history.push('/student-list')
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Fullname">
                        <Form.Label>Full Name :</Form.Label>
                        <Form.Control type="text" value={this.state.fullname} onChange={this.onChangeFullnameStudent} />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmailStudent} />
                    </Form.Group>

                    <Form.Group controlId="NRP">
                        <Form.Label>NRP :</Form.Label>
                        <Form.Control type="text" value={this.state.nrp} onChange={this.onChangeNrpStudent} />
                    </Form.Group>

                    <Form.Group controlId="Username">
                        <Form.Label>Username :</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.onChangeUsernameStudent} />
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label>Password :</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.onChangePasswordStudent} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role :</Form.Label>
                        <Form.Control as="select" className="custom-select select2" value={this.state.role} onChange={this.onChangeRoleStudent}>
                            <option value="">Pilih</option>
                            <option value="1">Admin</option>
                            <option value="2">Staff</option>
                            <option value="3">Student</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="success" size="lg" block="block" type="submit">Save</Button>
                    <Link to={"/list-student"} className="btn btn-danger btn-block">Cancel</Link>
                </Form>

            </div>
        );
    }
}

export default EditStudent
