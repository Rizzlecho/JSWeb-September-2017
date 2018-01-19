import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import reqHandler from "./../../utils/reqHandler";
import calcTime from './../../utils/calcTime'

import Comments from './partials/Comments';
import SubmitComment from './SubmitComment';

class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentPost : {},
            comments : [],
            time: '',
            postId: this.props.match.params.id
        }
    }

    componentDidMount() {
        let postId = this.props.match.params.id;
        reqHandler.getPostDetails(postId)
            .then(data => {
                this.setState({currentPost:data})
            }).then(()=> {
            reqHandler.getPostComments(postId)
                .then(comments => {
                    this.setState({comments:comments})
                })
        })
    }


    render(){
        return(
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href={this.state.currentPost.imageUrl}>
                            <img src={this.state.currentPost.imageUrl}/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href={this.state.currentPost.url}>
                                {this.state.currentPost.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.currentPost.description}</p>
                            <div className="info">
                                submitted by {this.state.currentPost.author} {this.state.time} ago
                            </div>
                            <div className="controls">
                                <ul>
                                    {this.state.currentPost.author === localStorage.getItem('username') ? <div>
                                        <li className="action"><Link className="editLink" to={`/edit/${this.state.currentPost._id}`}>edit</Link></li>
                                        <li className="action"><Link className="deleteLink" to={'/catalog'} onClick={()=>{reqHandler.deletePost(this.state.currentPost._id)}}>delete</Link></li></div> : <div/> }
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="clear"/>
                </div>
                <SubmitComment props={this.state.postId}/>
                {this.state.comments.map((comment, index)=>{
                    return <Comments key={comment._id} id={index + 1} props={comment} time={calcTime(comment._kmd.lmt)}/>
                })}
            </section>
        )
    }

}

export default PostDetails