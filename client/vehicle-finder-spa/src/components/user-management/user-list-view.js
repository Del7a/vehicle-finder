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
            this.props.users.length > 0 ? this.props.users.map((user) =>
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="output-box bg-info">
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to={{
                                    pathname: `/user/${user._id}`,
                                    state: { maker: true }}}>
                                    <h4 className="name">{user.username}</h4>
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                {!user.isAdmin ?
                                    <button className="btn btn-danger pull-right"
                                        onClick={this.handleDelete.bind(this, user._id)}>
                                        Remove
                                    </button>
                                : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
            :<div>Nothing to display</div>

        return (
            <div className="outputs">
                <div className="small-panel">
                    {listItems}
                </div>
            </div>
        )
    }
}