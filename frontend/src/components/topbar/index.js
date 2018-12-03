import React, { Component } from 'react';
import Logo from '../../assets/images/skunkLogo.svg';
import { Button } from '@material-ui/core';
import './index.css';
import Logout from '../../containers/logout';

class TopBar extends Component {
    render() {
        return <div className='TopBar'>
            <Button variant='outlined' color='primary' onClick={this.clickHandler}>Home</Button>
            <img src={Logo} className='TopBarLogo' alt='Skunk Sports'></img>
            <Logout history={this.props.history} />
        </div>
    }
    clickHandler = () => {
        this.props.history.replace('/')
    }
}

export default TopBar;