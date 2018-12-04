import React, { Component } from 'react';
import Logo from '../../assets/images/skunkLogo.svg';
import { Button } from '@material-ui/core';
import './index.css';
import Logout from '../../containers/logout';

class TopBar extends Component {
    back = () => {
        this.props.history.replace('/')
    }
    render() {
        return <div className='TopBar'>
            <img src={Logo} onClick={this.back} className='TopBarLogo' alt='Skunk Sports'/>
            <Logout history={this.props.history} />
        </div>
    }
}

export default TopBar;