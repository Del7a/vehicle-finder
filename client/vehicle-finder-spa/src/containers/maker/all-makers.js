import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestMakers, formChanged } from '../../actions/maker';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router'


class AllMakers extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
    }

    componentDidMount() {
        this.props.requestMakers()
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const {username, email, firstName, lastName} = this.props.user;
        this.props.postUserProfile(username, email, firstName, lastName);
    }

    formInputChanged(newFormState) {
        this.props.formChanged(newFormState);
    }


    render(){
    //     const redirAfterLogin = this.props.user.isLoggedIn ? 
    //        <Redirect to={'/home'}/>
    //     : '';
       
        const allMakers = this.props.maker.makers.length > 0 ?this.props.maker.makers.map((maker) => 
            <li key={maker._id}>
                <Link to={`/single-maker/${maker._id}`} > {maker.name} </Link>
            </li>
        ):
        <div>Nothing to display</div>;
        

    return(
        <div>
            <h1>All makers</h1>
            <div>{allMakers}</div>
            {/* <div>{redirAfterLogin}</div> */}
        </div>
    )}
    
}

function mapStateToProps({maker}) {
    console.log(maker)
    return {maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ requestMakers, formChanged }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMakers);