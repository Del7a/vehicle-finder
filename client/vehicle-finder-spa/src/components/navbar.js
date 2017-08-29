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
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#">Profile</a></li>
                <li className="dropdown">
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">Messages <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><a href="#">Inbox</a></li>
                        <li><a href="#">Drafts</a></li>
                        <li><a href="#">Sent Items</a></li>
                        <li className="divider"></li>
                        <li><a href="#">Trash</a></li>
                    </ul>
                </li>
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
                <li><Link to="/profile">Profile</Link></li>
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