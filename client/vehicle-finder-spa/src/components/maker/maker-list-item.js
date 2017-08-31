import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MakersListComponent extends Component {  

    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(modelId) {
        this.props.onHandleDelete(modelId)
    }

    render() {
        const listItems = this.props.makers.map((maker) =>
        <div key={maker._id} className="panel panel-default">
            <div className="panel-body">
                <div className="output-box bg-info">
                    <div className="row">
                        <div className="col-xs-6">
                            <Link to={`/single-maker/${maker._id}`}> 
                                <h4 className="name">{maker.name} </h4>
                            </Link>
                        </div>
                        <div className="col-xs-6">
                        {localStorage.getItem("userIsAdmin") ?
                            <button className="btn btn-danger pull-right"
                                onClick={() => this.handleDelete(maker._id)}>
                                Remove
                            </button>
                        : ''}
                    </div>
                    </div>
                </div>
            </div>
        </div>)            
        return (
            <div className="outputs">
                <div className="small-panel">
                    {listItems}
                </div>
            </div>
        )
    }
}