import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/user';
import NavbarComponent from '../components/navbar';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router'


class Navbar extends Component {

    render(){
        const isLoggedIn = this.props.user.isLoggedIn
                || localStorage.getItem("userIsLogged") === '1';
        const admin = localStorage.getItem("userIsAdmin") === '1';

        return(
            <NavbarComponent
                isLoggedIn={isLoggedIn}
                isAdmin={admin}
                logout={this.props.logout}
                handleSearch={this.handleSearch} >
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