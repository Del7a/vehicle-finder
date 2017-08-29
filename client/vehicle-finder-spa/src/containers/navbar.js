import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/user'
import NavbarComponent from '../components/navbar';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router'


class Navbar extends Component {


    render(){
        const isLoggedIn = this.props.user.isLoggedIn
                || localStorage.getItem("userIsLogged") === '1';
            console.log(this.props)
            debugger
        return(
            <NavbarComponent
                isLoggedIn={isLoggedIn}
                logout={this.props.logout}
            >
            </NavbarComponent>
        )}
    
}

function mapStateToProps({user}) {
    console.log(user)
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);