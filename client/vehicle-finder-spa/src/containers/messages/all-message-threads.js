import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessageThreads, changeCurrentMessageThread } from '../../actions/messages/';
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
            <div className="modal-body row">
            <MessageThreadListComponent
                messageThreads={this.props.messages.messageThreads}
                onMessageThreadClick={this.onMessageThreadClick}
                currentUserId={this.props.user.currentUserId}
            />
            </div>
        )
    }
}

function mapStateToProps({messages, user}) {
    return {messages, user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestAllMessageThreads, changeCurrentMessageThread}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMessageThreads)