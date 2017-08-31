import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessageThreads, changeCurrentMessageThread } from '../../actions/messages/';
import { getUserProfile } from '../../actions/user/';
import MessageThreadListComponent from '../../components/messages/list-item-view';

class AllMessageThreads extends Component {
    
    constructor(props) {
        super(props)

        this.onMessageThreadClick = this.onMessageThreadClick.bind(this)
    }

    componentDidMount() {
        if (!this.props.messages.messageThreads.length) {
            this.props.requestAllMessageThreads()
        }
        if (!this.props.user.currentUserId) {
            this.props.getUserProfile()
        }
    }

    onMessageThreadClick(messageThread) {
        if (!messageThread.messages) {
            messageThread.messages = [];
            messageThread.loadingMessages = true;
        }
        
        this.props.changeCurrentMessageThread(messageThread)
    }

    render() {
        return (
            <MessageThreadListComponent
                messageThreads={this.props.messages.messageThreads}
                onMessageThreadClick={this.onMessageThreadClick}
                currentUserId={this.props.user.userId}
            />
        )
    }
}

function mapStateToProps({messages, user}) {
    return {messages, user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestAllMessageThreads, changeCurrentMessageThread,
                        getUserProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMessageThreads)