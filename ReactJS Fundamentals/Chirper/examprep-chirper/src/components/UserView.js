import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
    countUserChirps, countUserFollowers, countUserFollowing, followUser, listAllUsers,
    listUserChirps, unfollowUser
} from "./utils/reqHandler";
import Chirp from "./partials/Chirp";

class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            chirps: [],
            chirpCount: 0,
            followingCount: 0,
            followersCount: 0,
            currentUser: localStorage.getItem('username'),
            userToSubscribe: ''
        };

        this.getData = this.getData.bind(this);

        // this.onClickHandler = this.onClickHandler.bind(this);
    }

    async getData() {
        const res = await listAllUsers();
        [...res].map(u => {

            if (u._id === this.props.match.params.id) {
                let result = Object.assign({}, u);
                this.setState({user: result});
                this.setState({userToSubscribe: result.username});

                return;
            }
        });
        console.log(this.state.user.username);
        console.log(this.state.userToSubscribe);
        const chirpData = await listUserChirps(this.state.user.username);
        this.setState({chirps: chirpData});

        const chirps = await countUserChirps(this.state.user.username);
        const following = await countUserFollowing(this.state.user.username);
        const followers = await countUserFollowers(this.state.user.username);

        let countFollowing = 0;
        this.setState({
            chirpCount: chirps.length,
            followingCount: countFollowing,
            followersCount: followers.length
        });

    }

    async onClickHandler(e, action) {
        e.preventDefault();

        // console.log(localStorage.getItem('subscriptions').split(',').indexOf(this.state.user.username));
        // const res = await followUser(this.state.user.username);
        if(action === 'follow'){
            const data = await followUser(this.state.user.username);
            this.props.history.push(`/user/${this.props.match.params.id}`);
            return;
        }
        const res = await unfollowUser(this.state.user.username);
        this.props.history.push(`/user/${this.props.match.params.id}`);
        // window.location.reload();

        // console.log(data);

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <section id="viewProfile">
                <div className="content">
                    <div className="chirper">
                        <h2 className="titlebar">{this.state.user.username}</h2>
                        {(localStorage.getItem('subscriptions').split(',').indexOf(this.state.user.username)) !== -1 ?
                            <Link onClick={(e) => this.onClickHandler(e, 'unfollow')} id="btnUnfollow" className="chirp-author"
                                  to={`/user/${this.props.match.params.id}`}>Unfollow</Link>
                            :
                            <Link onClick={(e) => this.onClickHandler(e, 'follow')} id="btnFollow" className="chirp-author"
                                  to={`/user/${this.props.match.params.id}`}>Follow</Link>
                        }

                        <div id="userProfileStats" className="user-details">
                            <span> {this.state.chirpCount} chirps |</span>
                            <span> {this.state.followingCount} following |</span>
                            <span> {this.state.followersCount} followers</span>
                        </div>
                    </div>
                    <div id="profileChirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                        {this.state.chirps.map((chirp) => {
                            return <Chirp key={chirp._id} id={chirp.id} props={chirp}/>
                        })
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(UserView);