import React, {Component} from 'react';
import {withRouter, NavLink, Link} from 'react-router-dom';
import logo from './images/logo.png'
import * as $ from 'jquery';
import {getUserDetails, getCategories} from "../../../api/remote";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: '',
            categories: []
        };

        this.dropdownProfile = this.dropdownProfile.bind(this);
        this.dropdownMobileMenu = this.dropdownMobileMenu.bind(this);
    }


    dropdownProfile() {
        $('.dropdown2').next('.dropdown-content2').slideToggle('fast');
    }

    dropdownMobileMenu() {
        $('#nav-icon4').toggleClass('open');
        $('#nav-icon4').next('.mobile-menu').slideToggle('fast');

    }

    async componentDidMount() {

        if (localStorage.getItem('username')) {
            // GETTING USER DETAILS
            const res = await getUserDetails();
            this.state.avatar = res[0].avatar;
            this.setState({avatar: res[0].avatar});

            // GETTING CATEGORIES AND PUSHING THEM INTO ARRAY
            let arrCategories = [];
            const resCategories = await getCategories();

            for (let obj in resCategories) {
                arrCategories.push(resCategories[obj]['category']);
            }
            this.setState({categories: arrCategories});
        }

    }

    render() {

        return (
            <header>
                <nav>

                    <ul className="nav-bar">
                        <li className="left">
                            <img className="logo" src={logo} alt="logo"/>
                        </li>
                        <li className="left"><NavLink to={'/'}>Home</NavLink></li>
                        <li className="left">
                            <NavLink to={`/categories`} className="dropdown">Categories</NavLink>
                            {/*<div className="dropdown-content">*/}
                                {/*{this.state.categories.map((category, index) => {*/}
                                    {/*return (*/}
                                        {/*<Link to={`/categories`}*/}
                                              {/*key={index}><span>{category}</span></Link>*/}
                                    {/*)*/}
                                {/*})}*/}

                            {/*</div>*/}
                        </li>


                        {this.props.loggedIn() &&
                        <li className="right" onClick={this.dropdownProfile}>
                            <img className="avatar dropdown2" src={this.state.avatar} alt="avt"/>
                        </li>}
                        {this.props.loggedIn() &&
                        <li className="right" onClick={this.dropdownProfile}>
                            <a className="dropdown2">{localStorage.getItem('username')}</a>
                            {/*PROFILE DROPDOWN*/}
                            <div className="dropdown-content dropdown-content2">
                                <NavLink to={`/profile/${localStorage.getItem('username')}`}>Profile</NavLink>
                                <a href="javascript:void(0)" onClick={this.props.onLogout}>Logout</a>
                            </div>
                        </li>}

                        {!this.props.loggedIn() && <li className="right"><NavLink to={'/login'}>Login</NavLink></li>}
                        {!this.props.loggedIn() &&
                        <li className="right"><NavLink to={'/register'}>Register</NavLink></li>}
                        {this.props.isAdmin() && <li className="right"><NavLink to={'/admin'}>Admin</NavLink></li>}
                        <li className="right upload shiny"><NavLink to={'/upload'}>Upload</NavLink></li>

                    </ul>


                    {/* MOBILE MENU */}
                    <div id="nav-icon4" onClick={this.dropdownMobileMenu}>
                        <span/>
                        <span/>
                        <span/>
                    </div>

                    <ul className="mobile-menu">
                        <li><Link to={'/'}>Home</Link></li>
                        <li>
                            <Link to={`/categories`} className="mobile-dropdown">Categories</Link>
                            {/*<div className="mobile-dropdown-content">*/}
                                {/*{this.state.categories.map((category, index) => {*/}
                                    {/*return (*/}
                                        {/*<Link to={`/category/${category}`}*/}
                                                 {/*key={index}><span>{category}</span></Link>*/}
                                    {/*)*/}
                                {/*})}*/}
                            {/*</div>*/}
                        </li>

                        {!this.props.loggedIn() && <li><Link to={'/login'}>Login</Link></li>}
                        {!this.props.loggedIn() && <li><Link to={'/register'}>Register</Link></li>}
                        {this.props.loggedIn() && <li><Link to={'/admin'}>Admin</Link></li>}
                        {this.props.loggedIn() &&
                        <li><Link to={'/profile'}>{localStorage.getItem('username')}</Link></li>}
                        {this.props.loggedIn() &&
                        <li><a href="javascript:void(0)" onClick={this.props.onLogout}>Logout</a></li>}
                        {this.props.loggedIn() && <li className="shiny"><Link to={'/upload'}>Upload</Link></li>}

                    </ul>
                    <Link className="mobile-logo" to={'/'}><h2>Bull Gallery</h2></Link>
                </nav>


            </header>
        );
    }
}

export default withRouter(Header)