import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getUserDetails, editProfile} from "../../../api/remote";
import toastr from 'toastr';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            avatar: '',
            id: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        // GET USER DETAILS
        const res = await getUserDetails();
        if (res.error) {
            toastr.error('Loading unsuccessful');
            return;
        }
        toastr.success('Posts Loaded Successfully');


        this.setState({username: res[0].username, avatar: res[0].avatar, id: res[0]._id,});
        console.log(this.state);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        // EDIT AVATAR
        const res = await editProfile(this.state.id, this.state.avatar);
        if(res.error){
            toastr.error('Edit unsuccessful');
            return;
        }

        window.location.reload();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="heading">
                    <h1>Profile</h1>
                    <hr/>
                </div>

                <div className="login-page profile-page">
                    <div className="form  profile-form">

                        <form onSubmit={this.onSubmitHandler} className="login-form">
                            <div className="login-form">
                                <img src={this.state.avatar} alt="img"/>
                                <label htmlFor="avatar">Choose Avatar</label>
                                <input onChange={this.onChangeHandler} id="avatar" name="avatar" type="text"
                                       placeholder=""
                                       value={this.state.avatar}/>
                            </div>

                            <div className="login-form">
                                <label htmlFor="title">Username</label>
                                <input id="title" type="text" placeholder="Name" value={this.state.username} disabled/>

                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Name" value="password" disabled/>

                                <button type="submit" className="btn btn--default shiny btn-login">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile)