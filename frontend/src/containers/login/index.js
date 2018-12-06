import React, { Component } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import connection from '../../connection';
import './index.css';
import logo from '../../assets/images/skunkLogo.svg';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        return localStorage.getItem('token') ?
            <Redirect to='/' /> :
            <div className='LoginScreen'>
                <Paper className='LoginPaper'>
                    <form onSubmit={this.submitHandler}>
                        <img src={logo} alt='Skunk Sports' className='LoginLogo' />
                        <TextField label='username' color='primary' fullWidth onChange={this.usernameHandler} value={this.state.username} className='LoginInput' />
                        <TextField label='password' color='primary' fullWidth onChange={this.passwordHandler} value={this.state.password} className='LoginInput' type='password' />
                        <div className='LoginButtonDiv'>
                            <Button
                                className='LoginButton'
                                color='primary'
                                variant='text'
                                type='submit'>
                                Login
                    </Button>
                        </div>
                    </form>
                </Paper>
            </div>
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
            type: 'setToken'
        })
    }
}

export default (connection(Login))