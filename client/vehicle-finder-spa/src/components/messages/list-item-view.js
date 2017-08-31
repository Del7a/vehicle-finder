import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MessageThreadListComponent extends Component {

    constructor(props) {
        super(props)

        this.onMessageThreadClick = this.onMessageThreadClick.bind(this)
    }

    onMessageThreadClick(messageThread) {
        this.props.onMessageThreadClick(messageThread)
    }

    render() {

        const listItems = this.props.messageThreads.map((messageThread) => {
            let corespondentsName = messageThread.receiveUser._id === this.props.currentUserId ?
                            messageThread.receiveUser.firstName + ' ' + messageThread.receiveUser.lastName:
                            messageThread.sendUser.firstName + ' ' + messageThread.sendUser.lastName;

            return <li key={messageThread._id} onClick={() => this.onMessageThreadClick(messageThread)}>
                <Link to={{pathname: `/messages/${messageThread._id}`}}>
                    <span>
                        {corespondentsName}
                    </span>
                        {messageThread.consernedOffer}
                </Link>
        </li>})
        return (
            <div> {listItems} </div>
        )
    }
}