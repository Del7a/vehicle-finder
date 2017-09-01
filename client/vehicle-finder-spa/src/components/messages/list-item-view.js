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
        var that = this;

        const listItems = this.props.messageThreads.map((messageThread) => {
            let corespondentsName = messageThread.receiveUser._id !== that.props.currentUserId ?
                            `${messageThread.receiveUser.firstName} ${messageThread.receiveUser.lastName} (${messageThread.receiveUser.email})` :
                            `${messageThread.sendUser.firstName} ${messageThread.sendUser.lastName} (${messageThread.sendUser.email})`
            debugger                
            return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="output-box bg-info">
                        <div className="row">
                            <div key={messageThread._id} onClick={() => this.onMessageThreadClick(messageThread)}
                                className="col-xs-12">
                                <Link to={{pathname: `/messages/${messageThread._id}`}}>
                                    <span>
                                        {corespondentsName}
                                    </span>
                                        {messageThread.consernedOffer}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            })
        return (
            <div className="outputs">
            <div className="small-panel">
            {listItems} </div></div>
        )
    }
}