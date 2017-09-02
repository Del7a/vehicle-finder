import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MessagesListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {messageCount: 0}

        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    componentDidUpdate() {
        if (this.state.messageCount !== this.props.messages.length) {
            this.setState({messageCount: this.props.messages.length})
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        const node = this.refs.dummyMessage
        debugger
        if(node.scrollHeight > 0) { 
            alert('a')
            debugger
        }
        node.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        const me = this.props.currentUser
        const listItems = this.props.messages.map((message) =>
            <li key={message._id}>
                    <div className={me === message.from? "me message-box": "other message-box" }>
                        <span className="date-created">
                            {new Date(message.createdAt).toLocaleString()}
                        </span>
                        <div className="message-body">
                            {message.body}
                        </div>
                    </div>
            </li>)

        return (
            <ul className='scroller'> 
                {listItems}
                <li>
                    <div ref="dummyMessage" id='dummyMessage'></div>
                </li>
            </ul>
        )
    }
}