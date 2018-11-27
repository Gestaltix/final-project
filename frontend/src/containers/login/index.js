import React, { Component } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import connection from '../../connection';
import './index.css';
import logo from '../../assets/images/skunkLogo.svg';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        return <Paper className='LoginPaper'>
            <form onSubmit={this.submitHandler}>
                <img src={logo} alt='Skunk Sports' className='LoginLogo' />
                <TextField label='username' fullWidth onChange={this.usernameHandler} value={this.state.username} />
                <TextField label='password' fullWidth onChange={this.passwordHandler} value={this.state.password} />
                <div className='LoginButton'><Button color='primary' variant='text' type='submit'>Login</Button></div>
            </form>
        </Paper>
    }
    usernameHandler = (e) => {
        this.setState({
            username: e.currentTarget.value
        })
    }
    passwordHandler = (e) => {
        this.setState({
            password: e.currentTarget.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.dispatch({
            method: 'POST',
            endpoint: 'auth/token',
            body: {
                username: this.state.username,
                password: this.state.password
            },
            type: null
        })
    }
}

export default connection(Login)