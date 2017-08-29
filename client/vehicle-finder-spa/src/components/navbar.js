import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(ev) {
        ev.preventDefault()
        this.props.logout()
    }

    render () {
    const isLogged = this.props.isLoggedIn;
    return (
    <div className="bs-example">
    <nav className="navbar navbar-default">
        <div className="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link to="/home" className="navbar-brand">AutoBot</Link>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
                <li className="active"/>
                <li className="dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">Articles <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/articles">All</Link></li>
                        <li><Link to="/create-article">Create</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">Subscriptions <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/subscriptions">All</Link></li>
                        <li><Link to="/create-subscription">Create</Link></li>
                    </ul>
                </li>
                <li><Link to="/messages">Messages</Link></li>
                <li><Link to="/all-users">Users</Link></li>
                <li><Link to="/all-makers">Maker/model</Link></li>
            </ul>
            <form className="navbar-form navbar-left">
            	<div className="input-group">
                    <input type="text" className="form-control" placeholder="Search"></input>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
                    </span>
                </div>
            </form>
            {isLogged ?
            <div>
            <ul className="nav navbar-nav navbar-right">
                <li onClick={this.logout}>
                    <Link to="/home">Logout</Link>
                </li>
            </ul> 
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">Profile <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/profile">Edit</Link></li>
                        <li><Link to="/change-pass">Change pass</Link></li>
                    </ul>
                </li>
            </ul> 
            </div>
            :
            <div>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">Login</Link></li>                
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/register">Register</Link></li>
            </ul>
            </div>}
        </div>
    </nav>
</div>
    )
  }
}

export default NavbarComponent