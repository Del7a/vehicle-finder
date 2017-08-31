import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MakersListComponent extends Component {  

    render() {
        const listItems = this.props.makers.map((maker) =>
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="output-box bg-info">
                    <div className="row">
                        <div className="col-xs-6">
                            <Link to={`/single-maker/${maker._id}`}> 
                                <h4 className="name">{maker.name} </h4>
                            </Link>
                        </div>
                        <div className="col-xs-6">
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