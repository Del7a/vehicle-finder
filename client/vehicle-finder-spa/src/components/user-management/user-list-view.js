import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserListComponent extends Component {  

    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(userId) {
        this.props.onHandleDelete(userId)
    }

    render() {
        console.log(this.props)
        const listItems = 
            this.props.users.length > 0 ?
            this.props.users.map((user) =>
                <li key={user._id}>
                    <Link to={{
                        pathname: `/user/${user._id}`,
                        state: { maker: true }}}>
                        {user.username}
                    </Link>
                    {!user.isAdmin ?
                     <button
                        onClick={this.handleDelete.bind(this, user._id)}>
                        X
                    </button>
                    : ''}
                </li>)
            :<div>Nothing to display</div>

        return (
            <div>{listItems}</div>
        )
    }
}