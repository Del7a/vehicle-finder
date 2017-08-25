import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessageThreads } from '../../actions/messages/';
import MessageThreadListComponent from '../../components/messages/list-item-view';

class AllMessageThreads extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.messages.messageThreads.length) {
            this.props.requestAllMessageThreads()
        }
    }

    render() {
        return (
            <MessageThreadListComponent
                messageThreads={this.props.messages.messageThreads}
            />
        )
    }
}

function mapStateToProps({messages}) {
    return {messages};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({requestAllMessageThreads}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllMessageThreads)