import connection from '../../connection';
import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core/'
import './index.css';
import TopBar from '../../components/topbar';
import { FilePond } from 'react-filepond';
import Dropzone from 'react-dropzone';

class CreateSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            package: null,
        }
    }
    render() {
        return this.props.teams ?
            <div>
                <TopBar history={this.props.history} />
                <Paper className='CreateSeshPaper'>Pick a team
            <select onChange={this.handleChange}>
                        <option selected disabled>Pick a team</option>
                        {this.props.teams.map((team, index) => {
                            return team.members.length !== 0 ? <option value={team.id} >{team.name}</option> : null
                        })}
                    </select>
                </Paper>
                {this.state.id ? <Dropzone onDrop={this.handleOnDrop} /> : null}
                {this.state.package ? <Button className='NameForm' onClick={this.clickHandler}>Upload Files</Button> : null}
            </div> : null
    }
    clickHandler = () => {
        const formdata = new FormData()
        formdata.append('file', this.state.package.data[0])
        formdata.append('team', this.state.id)
        formdata.append('tracker', 1)
        const options = {
            headers: {
                'Authentication': 'Bearer' + localStorage.getItem('token')
            },
            body: formdata,
            method: 'POST'
        }
        delete options.headers['Content-Type'];

        fetch('http://127.0.0.1:8000/backend/api/sessions/create/', options)
            .then(r => r.json())
            .then(r => console.log(r))
    }
    handleOnDrop = (e) => {
        this.setState({
            package: { data: e, id: this.state.id }
        })
    }
    handleChange = (e) => {
        console.log(e.currentTarget.value)
        this.setState({ id: parseInt(e.currentTarget.value) })
    }
    componentDidMount = () => {
        if (!localStorage.getItem('token')) { this.props.history.replace('/login') }
        else {
            this.props.dispatch({
                type: 'setTeam',
                method: 'GET',
                endpoint: 'teams',
            })
        }
    }
}

export default connection(CreateSession);