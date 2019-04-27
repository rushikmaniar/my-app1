import React from 'react';
import uuidv1 from 'uuid/v1';

import {Button} from 'reactstrap'
import Form from "reactstrap/es/Form";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Col from "reactstrap/es/Col";
import Table from "reactstrap/es/Table";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import ModalFooter from "reactstrap/es/ModalFooter";
import FormGroup from "reactstrap/es/FormGroup";

export class StudentCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEditing: false,

            hobbies: ['Singing', 'Reading', 'Coding'],
            student: {
                id: '',
                firstName: '',
                lastName: '',
                gender: '',
                hobbies: ['']
            },
            students: [
                {
                    id: uuidv1(),
                    firstName: "Rushik",
                    lastName: "Maniar",
                    gender: 'Male',
                    hobbies: ["Singing", "Reading"]
                },
                {
                    id: uuidv1(),
                    firstName: "Karan",
                    lastName: "Jilka",
                    gender: 'Male',
                    hobbies: ["Reading", "Coding"]
                },
                {
                    id: uuidv1(),
                    firstName: "Abhi",
                    lastName: "Maniar",
                    gender: 'Male',
                    hobbies: ["Coding"]
                }
            ],
        };
    }

    resetStudent() {
        const STUDENT = {
            id: '',
            firstName: '',
            lastName: '',
            gender: '',
            hobbies: []
        };
        this.setState({
            student: STUDENT
        });
    }

    handleOnAdd() {
        this.resetStudent();
        this.setState({
            isEditing: false
        });
        this.toggleModal()
    }


    handleOnChangeFirstName = (event) => {
        this.setState({
            student: {
                ...this.state.student,
                firstName: event.target.value
            }
        });
    };

    handleOnChangeLastName = (event) => {
        this.setState({
            student: {
                ...this.state.student,
                lastName: event.target.value
            }
        });
    };

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleOnClickGender(genderFlag) {
        this.setState({
            student: {
                ...this.state.student,
                gender: genderFlag
            }
        })
    }

    addHobby(hobbySelected) {
        this.setState({
            student: {
                ...this.state.student,
                hobbies: [...this.state.student.hobbies, hobbySelected]
            }
        })
    }

    deleteHobby(hobbySelected) {
        this.setState({
            student: {
                ...this.state.student,
                hobbies: this.state.student.hobbies.filter((hobby) => {
                    return hobby !== hobbySelected
                })
            }
        });
    }


    handleOnHobbiesCheck(hobbySelected) {
        const INDEX = this.state.student.hobbies.indexOf(hobbySelected);
        INDEX < 0 ?
            this.addHobby(hobbySelected)
            : this.deleteHobby(hobbySelected)
    }

    update() {
        this.setState((state) => {
            return {
                students: state.students.map((item) => {
                    return item.id !== this.state.student.id ? item : this.state.student
                }),
                isOpen: false
            }
        });
    }

    add() {
        this.setState({
            students: [...this.state.students, this.state.student],
            isOpen: false
        });
    }

    handleOnSave() {
        if (this.state.isEditing) {
            //update
            this.update();
        } else {
            //Add
            this.add();
        }
    }

    handleOnEdit(student) {
        /*set data in form */
        this.setState({
            isOpen: true,
            isEditing: true,
            student: student
        });

    }

    handleOnDelete(student) {
        if (window.confirm('Are You Sure?')) {
            this.setState({
                students: this.state.students.filter(studentItem => {
                    return studentItem.id !== student.id
                })
            });
        }
    }
    handleOnKeyDown(event){
        if(event.key === 'Enter'){
            this.handleOnSave();
        }
    }


    render() {
        const {students} = this.state;
        return (
            <div>
                <Button color="success" onClick={() => this.handleOnAdd()}>Add Student</Button>

                <StudentList
                    students={students}
                    onEdit={(student) => {
                        this.handleOnEdit(student)
                    }}
                    onDelete={(student) => {
                        this.handleOnDelete(student)
                    }}
                >

                </StudentList>

                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Add / Edit Student</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                {/* First Name */}
                                <Col sm={12}>
                                    <Label>Enter FirstName</Label>
                                    <Input type="text" name="firstName"
                                           onChange={this.handleOnChangeFirstName}
                                           onKeyDown={(event)=>this.handleOnKeyDown(event)}
                                           value={this.state.student.firstName} placeholder="Enter First Name"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                {/* Last Name */}
                                <Col sm={12}>
                                    <Label>Enter LastName</Label>
                                    <Input type="text" name="lastName"
                                           onChange={this.handleOnChangeLastName}
                                           value={this.state.student.lastName}
                                           placeholder="Enter Last Name"/>
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Col sm={12}>
                                    <Label>Select Gender</Label>
                                </Col>
                                <Col sm={12}>
                                    <Button color="success"
                                            active={this.state.student.gender === 'Male'}
                                            onClick={() => {
                                                this.handleOnClickGender('Male')
                                            }}>
                                        Male
                                    </Button>
                                    <Button color="danger"
                                            active={this.state.student.gender === 'Female'}
                                            onClick={() => {
                                                this.handleOnClickGender('Female')
                                            }}>
                                        FeMale
                                    </Button>
                                </Col>
                            </FormGroup>


                            {/*Hobbies*/}
                            <FormGroup>
                                <Col sm={4}>
                                    <Label>Select Hobbies</Label>
                                </Col>
                                <Col sm={12}>
                                    <ButtonGroup>
                                        {

                                            this.state.hobbies.map((hobby) => {
                                                return (
                                                    <Button color="primary"
                                                            key={uuidv1()}
                                                            onClick={() => {
                                                                this.handleOnHobbiesCheck(hobby)
                                                            }}
                                                            active={this.state.student.hobbies.includes(hobby)}>
                                                        {hobby}
                                                    </Button>
                                                )
                                            })
                                        }
                                    </ButtonGroup>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleOnSave()}>Save</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

class StudentList extends React.Component {

    handleOnEdit(student) {
        this.props.onEdit(student)
    }

    handleOnDelete(student) {
        this.props.onDelete(student);
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <td>FirstName</td>
                        <td>LastName</td>
                        <td>Gender</td>
                        <td>Hobbies</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.students.map((student, index) => {
                            return (
                                <tr key={student.id}>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.gender}</td>
                                    {
                                        <td>
                                            <ul>
                                                {
                                                    student.hobbies.map((hobby) => {
                                                        return (
                                                            <li key={uuidv1()}>{hobby}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </td>
                                    }
                                    <td>
                                        <Button color="success" onClick={() => this.handleOnEdit(student)}>Edit</Button>
                                        <Button color="danger"
                                                onClick={() => this.handleOnDelete(student)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}
