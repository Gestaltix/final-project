import React, { Component } from 'react';
import Logo from '../../assets/images/skunkLogo.svg';
import './index.css';
import Logout from '../../containers/logout';

class TopBar extends Component {
    render() {
        return <div className='TopBar'>
            <img src={Logo} className='TopBarLogo' alt='Skunk Sports'></img>
            <Logout history={this.props.history} />
        </div>
    }
}

export default TopBar;