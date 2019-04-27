import Table from "reactstrap/es/Table";
import Col from "reactstrap/es/Col";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormFeedback from "reactstrap/es/FormFeedback";
import {Button} from "reactstrap";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import Form from "reactstrap/es/Form";
import React from "react";

<Form>
    <Table>
        <tbody>

        {/* FirstName */}
        <tr>
            <td><Col sm={2}><Label>FirstName</Label></Col></td>
            <td>
                <Col sm={4}>
                    <Input type="text" name="firsrtname" placeholder="Enter Fisrt Name"/>
                    <FormFeedback invalid>Enter FirstName </FormFeedback>
                </Col>
            </td>
        </tr>

        {/* LastName */}
        <tr>
            <td><Col sm={2}><Label>LastName</Label></Col></td>
            <td><Col sm={4}><Input type="text" name="firsrtname" placeholder="Enter Last Name"/></Col>
            </td>
        </tr>

        {/* Gender */}
        <tr>
            <td><Col sm={2}>Gender</Col></td>
            <td>
                <Col sm={4}>
                    <Button color="success"
                            active={this.state.genderflag === 'Male'}
                            onClick={() => {
                                this.handleOnClickGender('Male')
                            }}>
                        Male
                    </Button>
                    <Button color="danger"
                            active={this.state.genderflag === 'Female'}
                            onClick={() => {
                                this.handleOnClickGender('Female')
                            }}>
                        FeMale
                    </Button>
                </Col>
            </td>
        </tr>


        {/* Hobbies */}
        <tr>
            <td><Col sm={2}>Hobbies</Col></td>
            <td>
                <Col sm={4}>
                    <ButtonGroup>
                        <Button color="primary"
                                onClick={() => {
                                    this.handleOnHobbiesCheck('Singing')
                                }}
                                active={this.state.hobbies.includes('Singing')}>
                            Singing
                        </Button>
                        <Button color="primary"
                                onClick={() => {
                                    this.handleOnHobbiesCheck('Reading')
                                }}
                                active={this.state.hobbies.includes('Reading')}>
                            Reading
                        </Button>
                        <Button color="primary"
                                onClick={() => {
                                    this.handleOnHobbiesCheck('Coding')
                                }}
                                active={this.state.hobbies.includes('Coding')}>
                            Coding
                        </Button>
                    </ButtonGroup>
                </Col>
            </td>
        </tr>

        {/* Submit */}
        <tr>
            <td colSpan={2}>
                <Button color="success">Submit</Button>
            </td>
        </tr>
        </tbody>
    </Table>
</Form>