import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCurrentUser, formChanged} from '../../actions/user';
import {updateSingleUser} from '../../actions/user-management';
import Form from '../../components/profile/info';


class SingleUser extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.userId) {
            const userId = this.props.match.params.userId
            const user = this.getCurretnUseFromManagementState(this.props.userManagement.allUsers, userId);
            if(user.length > 0) {
                this.props.setCurrentUser(user[0]);
            }
        }
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const userId = this.props.match.params.userId
        const user = this.getCurretnUseFromManagementState(this.props.userManagement.allUsers, userId)
        
        const userForSubmit = {...user[0], username: this.props.user.username,
            email: this.props.user.username,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName
        }
        this.props.updateSingleUser(userForSubmit)
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }

    getCurretnUseFromManagementState(allUsers, targetUserId)
    {
        return allUsers.filter(function(usr) {
                return usr._id === targetUserId
            })
    }


    render(){
        const infoMessage = this.props.userManagement.currentInfoMessage !== '' ?
                <div className="alert alert-success">
                    <strong>Success!</strong> {this.props.userManagement.currentInfoMessage}
                </div>
                : ''
        const errorMessage = this.props.userManagement.currentErrorMessage !== '' ?
                <div className="alert alert-danger">
                    {this.props.userManagement.currentErrorMessage}
                </div>
                : ''
        
        return(
            <div>
                {infoMessage}
                {errorMessage}
                {<Form
                    username={this.props.user.username}
                    email={this.props.user.email}
                    firstName={this.props.user.firstName}
                    lastName={this.props.user.lastName}
                    handleSubmit={this.handleSubmit}
                    formInputChanged={this.formInputChanged}
                />}
            </div>
        )
    }
    
}

function mapStateToProps({user, userManagement}) {
    return {user, userManagement};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({formChanged,updateSingleUser, setCurrentUser}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);