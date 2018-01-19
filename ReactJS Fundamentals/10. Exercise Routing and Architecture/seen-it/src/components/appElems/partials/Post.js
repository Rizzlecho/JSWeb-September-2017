import React from 'react';
import {Link} from 'react-router-dom';
import calcTime from './../../../utils/calcTime'
import reqHandler from './../../../utils/reqHandler';


let Post = (props)=>{
    return(
        <article className="post">
            <div className="col rank">
                <span>{props.id}</span>
            </div>
            <div className="col thumbnail">
                <a href={props.props.imageUrl}>
                    {props.props.imageUrl ?  <img src={props.props.imageUrl}/> : <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'/> }
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={props.props.url}>
                        {props.props.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted by {props.props.author} {calcTime(props.props._kmd.lmt)}
                    </div>
                    <div className="controls">
                        <ul>
                            <Link className="action commentsLink" to={`/details/${props.props._id}`}>comments</Link>
                            {props.props.author === localStorage.getItem('username') ? <div>
                                <li className="action"><Link className="editLink" to={`/edit/${props.props._id}`}>edit</Link></li>
                                <li className="action"><Link className="deleteLink" to={'/catalog'} onClick={()=>{reqHandler.deletePost(props.props._id)}}>delete</Link></li></div> : <div/> }
                        </ul>
                    </div>

                </div>
            </div>
        </article>
    )
};
export default Post;