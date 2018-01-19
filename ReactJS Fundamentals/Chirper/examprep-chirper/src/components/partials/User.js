import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {countUserFollowers} from "../utils/reqHandler";

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: 0
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const followers = await countUserFollowers(this.props.props.username);
        this.setState({followers: followers.length});
    }

    render() {
        return (
            <div className="userbox">
                <div><Link to={`/user/${this.props.props._id}`} className="chirp-author"
                           props={this.props.props}>{this.props.props.username}</Link></div>
                <div className="user-details">
                    <span>{this.state.followers} followers</span>
                </div>
            </div>
        )
    }
}

export default User;