import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarComponent from '../components/navbar';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router'


class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <NavbarComponent>
                isLoggedIn={this.props.user.isLoggedIn}
            </NavbarComponent>
        )}
    
}

function mapStateToProps({user}) {
    console.log(user)
    return {user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);