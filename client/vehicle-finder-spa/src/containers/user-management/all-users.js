import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCurrentUser} from '../../actions/user';
import { requestAllUsers, deleteSingleUser } from '../../actions/user-management';
import RegistrationForm from '../registration';
import UserListComponent from '../../components/user-management/user-list-view';

import { Redirect } from 'react-router'

class AllUsers extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount() {
        const emptyUser = {username: '', email: '',
                        firstName: '', lastName: ''}

        this.props.setCurrentUser(emptyUser)

        if(this.props.userManagement.allUsers.length === 0 ||
            this.props.userManagement.usersNeedResync) {
                this.props.requestAllUsers()
        }
    }

    componentDidUpdate() {
        if(this.props.userManagement.usersNeedResync) {
                this.props.requestAllUsers()
        }
    }

    handleDelete(userId) {
        this.props.deleteSingleUser(userId)
    }

    render() {
        const needResync = !this.props.userManagement.usersNeedResync ?
        <div> No need</div>
        : <div>Needs resync</div>
        
        return (
            <div>
                <h1>All users</h1>
                <div className="hidden">{needResync}</div>
                <UserListComponent
                    users={this.props.userManagement.allUsers}
                    onHandleDelete={this.handleDelete}
                />
                <RegistrationForm 
                    handleSubmit = {this.regiterUserSubmited}
                />
                {this.props.userManagement.usersNeedResync}
            </div>
        )
    }
}

function mapStateToProps({userManagement}) {
    return {userManagement};
}

function mapDispatchToProps(dispatch) {
    console.log('mapDispatchToProps')
    return bindActionCreators({ requestAllUsers, deleteSingleUser, setCurrentUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)