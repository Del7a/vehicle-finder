import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ModelListComponent extends Component {  

    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(ev) {
        debugger
        this.props.handleModelDelete(this.props.makerId, ev)
    }

    render() {
        console.log(this.props)
        const listItems = 
            this.props.models.length > 0 ?
            this.props.models.map((model) =>
                <li key={model._id}>
                    <Link to={{
                        pathname: `/model/${this.props.makerId}/${model._id}`,
                        state: { maker: true }}}>
                        {model.name}
                    </Link>
                     <button
                        onClick={this.handleDelete.bind(this, model._id)}>
                        X
                    </button> 
                </li>)
            :<div>Nothing to display</div>

        return (
            <div>{listItems}</div>
        )
    }
}