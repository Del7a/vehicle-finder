import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MessageThreadListComponent extends Component {

    constructor(props) {
        super(props)

        this.onMessageThreadClick = this.onMessageThreadClick.bind(this)
    }

    onMessageThreadClick(messageThread) {
        debugger
        this.props.onMessageThreadClick(messageThread)
    }

    render() {
        const listItems = this.props.messageThreads.map((messageThread) =>
            <li key={messageThread._id} onClick={() => this.onMessageThreadClick(messageThread)}>
                <Link to={{pathname: `/messages/${messageThread._id}`}}>
                    <span>
                        {messageThread.receiveUser.firstName} &nbsp;
                        {messageThread.receiveUser.lastName}
                    </span>
                        {messageThread.consernedOffer}
                </Link>
            </li>)
        return (
            <div> {listItems} </div>
        )
    }
}