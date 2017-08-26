import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessages,  sendMessage, markAsRead, addMessageToArticle, changeCurrentMessageThread} from '../../actions/messages';
import { getUserProfile } from '../../actions/user'
import MessagesListComponent from '../../components/messages/message-list';
import AddMessageComponent from '../../components/messages/add-message';

class SingleMessageThread extends Component {

    constructor(props) {
        super(props)

        console.log(props)
        this.handleMessageSend = this.handleMessageSend.bind(this) 
        this.onMessageThreadClick = this.onMessageThreadClick.bind(this)
    }

    componentDidMount() {
        if(this.props.match) {
            const threadId = this.props.match.params.id;
            var currentThread = {...this.props.messages.currentMessageThread, _id: threadId}  
            this.props.requestAllMessages(currentThread);            
        }
        if(!this.props.user.userId) {
            this.props.getUserProfile()
        }
    }

    handleMessageSend(newMessage) {
        let articleId = this.props.articleId;

        if (this.props.messages.currentMessageThread._id) {
            this.props.sendMessage(newMessage, this.props.messages.currentMessageThread)
        } 
        else if (articleId) {
            let articleOwner = this.props.articleOwner._id;
            this.props.addMessageToArticle(articleId, articleOwner, newMessage)
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
            <div>
                 <MessagesListComponent 
                    messages={this.props.messages.currentMessageThread.messages}
                    currentUser={this.props.user.userId}
                 /> 

                <div>
                    Add message
                </div>
                <AddMessageComponent
                    handleMessageSend={this.handleMessageSend}
                />
            </div>
        )
    }
}

function mapStateToProps({messages, user}) {
    console.log(user)
    return {messages, user};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addMessageToArticle, changeCurrentMessageThread, requestAllMessages, 
                                getUserProfile, sendMessage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessageThread)