import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class CreateStudent extends Component {
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
            role: ''
        }
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

    postMhs = (nama, email, nrp, userId) => {
        axios.post('http://localhost:1337/mahasiswa', null, { params: {
                nama: nama,
                email: email,
                nrp: nrp,
                userId: userId
        }})
            .then(res => console.log(res.data))
            .catch(err => console.warn(err));
    };

    onSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:1337/users/insert.json', null,{ params: {
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }
        }).
        then(response => {
            if (response.status === 500) {
                console.log(response.data);
            } else if (response.status === 200 && response.data.status === 200) {
                console.log(response.data.item.id);
                var userId = response.data.item.id;
                this.postMhs(this.state.fullname, this.state.email, this.state.nrp, userId);
            } else if (response.status === 200 && response.data.status !== 200) {
                console.log("Error inserted new data because : "+response.data.message);
            } else {
                console.log("Server error with : "+response.data);
            }

        })
         .catch(err => console.warn(err));

        this.setState({
            fullname: '',
            email: '',
            nrp: '',
            username: '',
            password: '',
            role: ''
        })
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
                </Form>

            </div>
        );
    }
}

export default CreateStudent
