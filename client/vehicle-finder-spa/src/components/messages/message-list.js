import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MessagesListComponent extends Component {

    render() {
        const me = this.props.currentUser
        const listItems = this.props.messages.map((message) =>
            <li key={message._id}>
                    <div className={me === message.from? "me message-box": "other message-box" }>
                        <span className="date-created">
                            {message.createdAt}
                        </span>
                        <div className="message-body">
                            {message.body}
                        </div>
                    </div>
            </li>)

        return (
            <ul> 
                {listItems}
            </ul>
        )
    }
}