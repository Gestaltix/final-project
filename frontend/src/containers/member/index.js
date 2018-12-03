import React, { Component } from 'react';
import connection from '../../connection';
import { Button, TextField } from '@material-ui/core';
import './index.css';
import TopBar from '../../components/topbar'

class Member extends Component {
    constructor(props) {
        super(props)
        this.state = {
            member: {},
            name: '',
            weight: '',
            height: '',
            birthday: '',
        }
    }
    render() {
        console.log('This is ian', this.state.member)
        return Object.keys(this.state.member).length !== 0 ?
            <div>
                <TopBar history={this.props.history} />
                <h1 className='NameForm'>
                    {this.state.member.name}
                </h1>
                <h2 className='NameForm'>
                    Update Info
                </h2>
                <form onSubmit={this.submitHandler}>
                    <div className='PlayerForm'>
                        <TextField label='Name' onChange={this.nameChangeHandler} value={this.state.name} placeholder={this.state.member.name} InputLabelProps={{ shrink: true }} />
                        <TextField label='Weight(kg)' onChange={this.weightChangeHandler} value={this.state.weight} placeholder={this.state.member.weight} InputLabelProps={{ shrink: true }} />
                        <TextField label='Height' onChange={this.heightChangeHandler} value={this.state.height} placeholder={this.state.member.height} InputLabelProps={{ shrink: true }} />
                        <TextField type='date' label='Birthday' onChange={this.birthdayChangeHandler} placeholder={this.state.member.birthday} value={this.state.age} InputLabelProps={{ shrink: true }} />
                    </div >
                    <Button type='submit'>Update Player</Button>
                </form>
                <Button onClick={this.clickHandler}>Delete Player</Button>
            </div>
            : null
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
        this.setState({
            name: '',
            weight: '',
            height: '',
            birthday: '',
        })
        this.props.dispatch({
            method: 'PUT',
            endpoint: `teams/members/${this.state.member.id}`,
            type: null,
            body: {
                name: this.state.name !== '' ? this.state.name : this.state.member.name,
                weight: this.state.weight !== '' ? this.state.weight : this.state.member.weight,
                height: this.state.height !== '' ? this.state.height : this.state.member.height,
                birthday: this.state.birthday !== '' ? this.state.birthday : this.state.member.birthday,
            }
        }).then(() => this.componentDidMount())
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setTeam',
            method: 'GET',
            endpoint: 'teams',
        }).then(() => {
            this.setState({
                member: this.props.teams[this.props.nonFetchData.teamTab].members.find(member => {
                    return member.id === parseInt(this.props.match.params.id)
                })
            })
        })
    }
    clickHandler = () => {
        if (prompt('This action is irreversible. Are you sure you want to do this?\nType "yes" to continue.').toLowerCase() === 'yes') {
            this.props.dispatch({
                method: 'DELETE',
                endpoint: `teams/members/${this.state.member.id}`,
                type: null
            }).then(() => { this.props.history.replace('/') })
        }
    }
}
export default connection(Member);