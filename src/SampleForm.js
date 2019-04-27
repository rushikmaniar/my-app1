import React from 'react';

const hobbies = ["Reading", "Singing", "Dancing", "Swimming"];

export class DisplayStateData extends React.Component {
    render() {
        if (this.props.displayButtonFlag) {
            return (
                <div>
                    <h3>FirstName:{this.props.firstname}</h3>
                    <h3>Gender:{this.props.gender}</h3>
                    <h3>DOB:{this.props.dob}</h3>
                    <h3>Hobbies:</h3>
                    <ul>{
                        this.props.selectedHobbies.map((hobby) => {
                            return (
                                <li key={hobby.toString()}>{hobby}</li>
                            );
                        })}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {flag: true, timerID: '', date: new Date()};
    }

    tick() {
        this.setState({date: new Date()})
    }

    componentDidMount() {


        this.timerID = setInterval(
            () => this.tick(),
            1000
        )


    }

    /*
    * handleOnStartClick
    * */
    handleOnStartClick = (event) => {

        if (this.state.displayButtonFlag === false) {
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    };

    /*
    * handleOnstop Click
    * */
    handleOnStopClick = (event) => {
        this.setState({displayButtonFlag: false});
        clearInterval(this.timerID);
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const clockstyle = {
            backgroundColor: '#FFFF00',
            height: 200,
            width: 200
        };
        return (
            <div style={clockstyle}>
                <h1>Clock</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <button type="button" onClick={this.handleOnStartClick}>Start</button>
                <button type="button" onClick={this.handleOnStopClick}>Stop</button>
            </div>

        );
    }
}


export class SampleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {firstname: '', gender: 'male', dob: '', hobbies: hobbies, selectedHobbies: [], flag: false};
    }



    /*
    * handles Form Submit
    * */
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState({displayButtonFlag: true});
    };


    /*
    * handles Hobbbies  Change
    * */
    handleHobbiesChange = (event) => {
        const selectedList = Array.from(event.target.selectedOptions);
        const finalList = selectedList.map((item) => item.name);
        this.setState({selectedHobbies: finalList});
    };

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.name;

        this.setState((state) => {
            return {
                [name]: value
            }
        })
    };


    render() {
        const hobbiesList = hobbies.map((hobby) =>
            <option key={hobby}>{hobby}</option>
        );

        return (
            <div>
                <Clock/>
                <form onSubmit={this.handleFormSubmit}>
                    <table align="center" border="5" cellPadding="5" cellSpacing="5">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td>Description</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="firstname" required={true} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>
                                <label>Male</label>
                                <input type="radio" name="gender" value="male" onChange={this.handleChange} required={true}
                                       checked={this.state.gender === 'male'}/>
                                <label>Female</label>
                                <input type="radio" name="gender" value="female" onChange={this.handleChange}
                                       checked={this.state.gender === 'female'}/>
                            </td>

                        </tr>

                        <tr>
                            <td>DOB</td>
                            <td><input type="date" name="dob" onChange={this.handleChange} required={true}/></td>
                        </tr>

                        <tr>
                            <td>Hobbies</td>
                            <td>
                                <select name="hobbies" onChange={this.handleHobbiesChange} required={true} multiple={true}>
                                    {hobbiesList}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>

                <DisplayStateData
                    flag={this.state.displayButtonFlag}
                    firstname={this.state.firstname}
                    gender={this.state.gender}
                    dob={this.state.dob}
                    selectedHobbies={this.state.selectedHobbies}>

                </DisplayStateData>
            </div>
        );
    }
}