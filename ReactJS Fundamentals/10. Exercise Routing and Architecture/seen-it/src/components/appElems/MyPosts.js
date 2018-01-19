import React, {Component} from 'react';
import reqHandler from './../../utils/reqHandler';
import Post from './partials/Post'

class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        reqHandler.getMyPosts().then(data => {
            this.setState({posts: data});
        })
    }

    render() {
        return (
            <section id="viewMyPosts">
                <div className="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div className="posts">
                    {this.state.posts.length !== 0 ?
                        this.state.posts.map((post, index) => {
                            return <Post key={post._id} id={index + 1} props={post}/>
                        }) : <article className="post"><div>No posts in database</div></article>}
                </div>
            </section>
        )
    }
}

export default MyPosts;