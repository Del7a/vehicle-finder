import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class AddMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.handleMessageSend = this.handleMessageSend.bind(this)
    }

    handleMessageSend(ev) {
        ev.preventDefault()
        this.props.handleMessageSend(ev.target.children.inputMessage.value)
        ev.target.children.inputMessage.value = "";
    }

    render() {
        return(
            
            <div>
                <form onSubmit={this.handleMessageSend} >
                    <input className="centered-text" id="inputMessage" type="text" placeholder="send a message"/>
                </form>
            </div>
            
        )
    }
}