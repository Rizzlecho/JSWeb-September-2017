import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Catalog from '../appElems/Catalog';
import MyPosts from '../appElems/MyPosts';
import SubmitPost from '../appElems/Submit';
import GuestHome from './../auth/Home';
import PostDetails from '../appElems/PostDetails';
import EditPost from '../appElems/EditPost'
let ViewComponent = () => {
    return (
        <Switch>
            <Route exact path='/' component={GuestHome}/>
            <Route  path='/catalog' component={Catalog}/>
            <Route  path='/submit' component={SubmitPost}/>
            <Route  path='/myPosts' component={MyPosts}/>
            <Route path='/details/:id' component={PostDetails}/>
            <Route path='/edit/:id' component={EditPost}/>
        </Switch>
    )
};

export default ViewComponent