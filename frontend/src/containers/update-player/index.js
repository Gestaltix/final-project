import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import connection from '../../connection';
import TopBar from '../../components/topbar';

class NewPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            weight: '',
            height: '',
            birthday: '',
        }
    }
    render() {
        console.log('These are MY Props...', this.props)
        return <div>
            <TopBar history={this.props.history} />
            <form onSubmit={this.submitHandler}>
                <div className='PlayerForm'>
                    <TextField label='Name' onChange={this.nameChangeHandler} value={this.state.name} helperText={this.props.player.name} />
                    <TextField label='Weight(kg)' onChange={this.weightChangeHandler} value={this.state.weight} helperText={this.props.player.weight} />
                    <TextField label='Height' onChange={this.heightChangeHandler} value={this.state.height} helperText={this.props.player.height} />
                    <TextField type='date' label='Birthday' onChange={this.birthdayChangeHandler} value={this.state.age} helperText={this.props.player.birthday} InputLabelProps={{ shrink: true }} />
                </div >
                <Button type='submit'>Update</Button>
            </form>
        </div>
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
    birthdayChangeHandler = (e) => {
        this.setState({
            birthday: e.currentTarget.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log('dispatching...')
        this.props.dispatch({
            method: 'PUT',
            endpoint: `teams/members/${this.props.match.params.id}`,
            type: null,
            body: {
                name: !this.state.name ? this.props.player.height : this.state.name,
                weight: !this.state.weight ? this.props.player.weight : this.state.weight,
                height: !this.state.height ? this.props.player.height : this.state.height,
                birthday: !this.state.birthday ? this.props.player.birthday : this.state.birthday,
            }
        }).then(
            this.setState({
                name: '',
                weight: '',
                height: '',
                birthday: '',
            })).then(() => { this.props.history.goBack() })
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'Auth',
            method: 'POST',
            endpoint: 'auth/token/verify',
            body: { token: localStorage.getItem('token') }
        }).then(() => {
            console.log(this.props.auth.isAuthenticated)
            if (this.props.auth.isAuthenticated === false) {
                localStorage.removeItem('token')
                this.props.history.replace('/login')
            }
        })
        this.props.dispatch({
            type: 'setPlayer',
            method: 'GET',
            endpoint: `teams/members/${this.props.match.params.id}`,
        })
    }
}

export default connection(NewPlayer);