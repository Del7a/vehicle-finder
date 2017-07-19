import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile, fetchUserProfile, postNewUserData} from '../actions'

//let _firstName, _lastName, _email = '';

class UserProfile extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeFirstname = this._changeFirstname.bind(this)
    this._changeLastname = this._changeLastname.bind(this)
    this._changeEmail = this._changeEmail.bind(this)
  }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchUserProfile())
    }

    render()
    {
        return(
            <form className='form' onSubmit={this._onSubmit}>
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        type='text'
                        id='firstname'
                        value={this.props.data.firstName}
                        placeholder='First name'
                        onChange={this._changeFirstname}
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false' />
                    <label className='form__field-label' htmlFor='firstname'>
                        First name
                    </label>
                </div>
                 <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        type='text'
                        id='lastname'
                        value={this.props.data.lastName}
                        placeholder='Last name'
                        onChange={this._changeLastname}
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false' />
                    <label className='form__field-label' htmlFor='lastname'>
                        Last name
                    </label>
                </div>
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        type='text'
                        id='email'
                        value={this.props.data.email}
                        placeholder='Email'
                        onChange={this._changeEmail}
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false' />
                    <label className='form__field-label' htmlFor='email'>
                        Email
                    </label>
                </div>
                <button className='form__submit-btn' type='submit'>
                    Update
                </button>
            </form>
        )
    }

    _changeFirstname (event) {
        console.log("_changeFirstname")
        this._emitChange({...this.props.data, firstName: event.target.value})
        //_firstName = event.target.value;
    }

    _changeLastname (event) {
        this._emitChange({...this.props.data, lastName: event.target.value})
        //_lastName = event.target.value;
    }

    _changeEmail (event) {
        this._emitChange({...this.props.data, email: event.target.value})
        //_email = event.target.value;
    }

    _emitChange (newFormState) {
        console.log(newFormState);
        this.props.dispatch(updateUserProfile(newFormState))
    }

    _onSubmit (event) {
        event.preventDefault()
        console.log("Submit");
        this.props.dispatch(postNewUserData({
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            email: this.props.data.email}));
    }   
}

function select (state) {
    return {
        data: state.profile
    }
}

export default connect(select)(UserProfile)