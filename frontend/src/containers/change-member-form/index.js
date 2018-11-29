import React, { Component } from 'react';
import connection from '../../connection';
import { TextField, Paper, Button, Tabs, Tab } from '@material-ui/core';
import './index.css';

class ChangeMemberForm extends Component {
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
        console.log(this.props)
        return this.props.teams[this.props.nonFetchData.teamTab].length !== 0 ?
            <Paper>

                <div className='GraphButton'><Button>Add Player</Button></div>
                <Tabs centered value={this.props.nonFetchData.memberTab} onChange={(e, index) => this.tabHandler(e, index)} indicatorColor='primary'>
                    {this.props.teams[this.props.nonFetchData.teamTab].members.map(tab => { return <Tab key={tab.name} label={tab.name} /> })}
                </Tabs>
                <h2>{this.props.teams[this.props.nonFetchData.teamTab].members[this.props.nonFetchData.memberTab].name}</h2>
                <form onSubmit={this.submitHandler}>
                    <div className='PlayerForm'>
                        <TextField label='Name' onChange={this.nameChangeHandler} value={this.state.name}
                            helperText={this.props.teams[this.props.nonFetchData.teamTab].members[this.props.nonFetchData.memberTab].name} />
                        <TextField label='Weight' onChange={this.weightChangeHandler} value={this.state.weight}
                            helperText={this.props.teams[this.props.nonFetchData.teamTab].members[this.props.nonFetchData.memberTab].weight} />
                        <TextField label='Height' onChange={this.heightChangeHandler} value={this.state.height}
                            helperText={this.props.teams[this.props.nonFetchData.teamTab].members[this.props.nonFetchData.memberTab].height} />
                        <TextField label='Age' onChange={this.ageChangeHandler} value={this.state.age}
                            helperText={this.props.teams[this.props.nonFetchData.teamTab].members[this.props.nonFetchData.memberTab].birthday} />
                    </div>
                    <Button type='submit'>Change User Data</Button>
                </form>
            </Paper >
            :
            <h3>You don't have any teams. Please go to the "Add Teams" tab.</h3>
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
    tabHandler = (e, index) => {
        this.props.dispatch({
            type: 'changeMemberTab',
            tab: index
        })
    }
}

export default connection(ChangeMemberForm);