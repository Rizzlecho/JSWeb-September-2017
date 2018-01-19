import React, {Component} from 'react';
import User from "./partials/User";
import {listAllUsers} from "./utils/reqHandler";


class DiscoverPeople extends Component{
    constructor(props){
        super(props);

        this.state={
            users: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        const res = await listAllUsers();
        let userList = [];
        [...res].map(user=>{
            if(user.username !== localStorage.getItem('username')){
                userList.push(user);
            }
        });
        this.setState({users:userList});
    }

    render(){
        return(
            <section id="viewDiscover">
                <div className="content">
                    <div className="chirps">
                        <h2 className="titlebar">Discover</h2>
                        <div id="userlist">
                            {this.state.users.map(u =>{
                                return <User key={u._id} props={u}/>
                            })}
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default DiscoverPeople;