import React, { Component } from 'react';
import './index.css';
import Home from '../home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../login';
import CreateSession from '../create-session';
import NewTeam from '../new-team';
import NewPlayer from '../new-player';
import Member from '../member';
import Team from '../team';
import Session from '../session';
import connect from "react-redux/es/connect/connect";
import Player from '../player';

class App extends Component {
    componentDidMount = () => {
        this.props.dispatch({
            type: 'setTeams',
            method: 'GET',
            endpoint: 'teams',
        })
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/new-team' component={NewTeam} />
                        <Route exact path='/team/:id' component={Team} />
                        <Route exact path='/new-player' component={NewPlayer} />
                        <Route exact path='/create-session' component={CreateSession} />
                        <Route exact path='/players/:id' component={Member} />
                        <Route exact path='/sessions/:id' component={Session} />
                        <Route exact path='/player/:id' component={Player} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect()(App)
