import React from 'react';
import './App.css';
import {StudentCrud} from './StudentCrud';
//import {TodoApp} from "./TodoApp";
//import {SampleForm} from "./SampleForm";


function App() {
    return (
        <div className="App">
            <h2 align="center">Student Form</h2>
            <StudentCrud/>
        </div>
    );
}

export default App;
