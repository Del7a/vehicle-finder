import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MessageThreadListComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const listItems = this.props.messageThreads.map((messageThread) =>
            <li key={messageThread._id}>
                <Link to={{pathname: `/messages/${messageThread._id}`}}>
                    {messageThread.consernedOffer}
                </Link>
            </li>)
        return (
            <div> {listItems} </div>
        )
    }
}