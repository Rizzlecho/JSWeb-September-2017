import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Navigation extends Component{
    constructor(props){
        super(props);

    }
    render() {
        const {onLogout} = this.props;
        return (
            <div className="menu">
                <Link to="/feed">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/me">Me</Link>
                <a href="javascript:void(0)" onClick={onLogout}>Logout</a>
            </div>
        )
    }
}

export default withRouter(Navigation);