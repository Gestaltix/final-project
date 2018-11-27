import React, { Component } from 'react';
import connection from '../../connection';
import { TextField, Paper, Button } from '@material-ui/core';
import './index.css';

class ChangePlayerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            weight: '',
            height: '',
            age: '',
        }
    }
    render() {
        return <Paper >
            <form onSubmit={this.submitHandler}>
                <div className='PlayerForm'>
                    <TextField label='Name' onChange={this.nameChangeHandler} value={this.state.name} />
                    <TextField label='Weight' onChange={this.weightChangeHandler} value={this.state.weight} />
                    <TextField label='Height' onChange={this.heightChangeHandler} value={this.state.height} />
                    <TextField label='Age' onChange={this.ageChangeHandler} value={this.state.age} />
                </div>
                <Button type='submit'>Change User Data</Button>
            </form>
        </Paper>
    }
    nameChangeHandler = (e) => {
        this.setState({
            name: e.currentTarget.value
        })
    }
    weightChangeHandler = (e) => {
        this.setState({
            weight: e.currentTarget.value
        })
    }
    heightChangeHandler = (e) => {
        this.setState({
            height: e.currentTarget.value
        })
    }
    ageChangeHandler = (e) => {
        this.setState({
            age: e.currentTarget.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.dispatch({
            method: 'POST',
            endpoint: 'change-player',
            type: 'changePlayer',
            body: {
                name: this.state.name,
                weight: this.state.weight,
                height: this.state.height,
                age: this.state.age,
            }
        })
        this.setState({
            name: '',
            weight: '',
            height: '',
            age: '',
        })
    }
}

export default connection(ChangePlayerForm);