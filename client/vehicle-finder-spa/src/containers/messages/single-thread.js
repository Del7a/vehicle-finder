import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllMessages,  sendMessage, markAsRead, addMessageToArticle, newThreadRead, changeCurrentMessageThread} from '../../actions/messages';
import { getUserProfile } from '../../actions/user'
import MessagesListComponent from '../../components/messages/message-list';
import AddMessageComponent from '../../components/messages/add-message';

class SingleMessageThread extends Component {

    constructor(props) {
        super(props)

        this.state = {pollRequestId: -1}
        this.handleMessageSend = this.handleMessageSend.bind(this) 
        this.onMessageThreadClick = this.onMessageThreadClick.bind(this)
    }

    componentDidMount() {
        this.props.newThreadRead()

        if(this.props.match) {
            const threadId = this.props.match.params.id;
            var currentThread = {...this.props.messages.currentMessageThread, _id: threadId}  
            this.props.requestAllMessages(currentThread);   
            
            const that = this

            const intervalId = setInterval(() => {
                that.props.requestAllMessages(currentThread);
                this.props.markAsRead(currentThread);
            }, 2000)

            this.setState({pollRequestId: intervalId})     
        }

        if(!this.props.user.userId) {
            this.props.getUserProfile()
        }
    }

    
    componentWillUnmount() {
        const intervalId = this.state.pollRequestId
        if(intervalId) {
            clearInterval(intervalId)
        }
    }

    handleMessageSend(newMessage) {
        let articleId = this.props.articleId;

        if (this.props.messages.currentMessageThread._id) {
            this.props.sendMessage(newMessage, this.props.messages.currentMessageThread, this.props.user.userId)
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

    getMinutesBetweenDates(startDate, endDate) {
        var diff = endDate - startDate;
        var diffInMins = (diff / 60000);
        return Math.floor(diffInMins)
    }
    
    render() {
        let currentThread = this.props.messages.currentMessageThread
        
        let otherUserLastSeen = currentThread.sendUser === this.props.user.userId
                                ? currentThread.recieverLastSeen
                                : currentThread.senderLastSeen;

        let minutesDifference = '';

        if(otherUserLastSeen) {
            let startDate = Date.parse(otherUserLastSeen)
            minutesDifference = this.getMinutesBetweenDates(startDate, Date.now());

            if (minutesDifference < 2) {
                minutesDifference = 'The other user is active';
            } else {
                minutesDifference = `Other user last seen ${minutesDifference} minutes ago`;
            }
        }

        return (
            <div className='scroller-wrap'>
                <MessagesListComponent
                    messages={this.props.messages.currentMessageThread.messages}
                    currentUser={this.props.user.userId}
                />

                <div>
                    {minutesDifference}
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
                                getUserProfile, sendMessage, markAsRead,
                                newThreadRead}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessageThread)