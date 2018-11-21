import React, { Component } from 'react';
import Logo from '../../assets/images/skunkLogo.svg';
import './index.css';

class TopBar extends Component {
    render() {
        return <div className='TopBar'><img src={Logo} className='TopBarLogo' alt='Skunk Sports'></img></div>
    }
}

export default TopBar;