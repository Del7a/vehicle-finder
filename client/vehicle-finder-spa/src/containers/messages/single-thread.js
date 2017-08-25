import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessages, sendMessage, markAsRead} from '../../actions/messages';
import SingleMessageThreadComponent from '../../components/messages/single-item-view';

class SingleMessageThread extends Component {

    componentDidMount()
}