import React, { Component } from 'react';

export default class MakersListComponent extends Component {  

    render() {
        const listItems = this.props.makers.map((maker) =>
            <li key={maker._id}>
                {maker}
            </li>)

        return (
            {listItems}
        )
    }
}