import React from 'react';
import reqHandler from './../../../utils/reqHandler'
import {Link} from 'react-router-dom'


let Comments = (props) =>{
    return(
        <article className="post post-content">
            <p>{props.props.content}</p>
            <div className="info">
                submitted {props.time} ago by {props.props.author} | {localStorage.getItem('username') === props.props.author ? <Link to={`/details/${props.props.postId}`} onClick={()=>{reqHandler.deleteComment(props.props._id);}} className="deleteLink">delete</Link> : <div/>}
            </div>
        </article>
    )
};

export default Comments;