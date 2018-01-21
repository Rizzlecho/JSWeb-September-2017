import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
    getCommentsOfPost, getPostDetails, postComment, deleteComment, deletePost,
    deleteCommentsOfPost, getDetailsOfUser
} from "../../../api/remote";
import toastr from 'toastr';


class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            title: '',
            image: '',
            category: '',
            description: '',
            creator: '',
            counter: '',
            lmt: '',
            comments: [],
            commentText: '',
            imgLoader: true,
            commentLoader: true,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.calcTime = this.calcTime.bind(this);
        this.deleteCmt = this.deleteCmt.bind(this);
        this.deletePostById = this.deletePostById.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        // GET POST DETAILS
        const res = await getPostDetails(this.props.match.params.id);
        this.setState({imgLoader: false});
        if (res.error) {
            toastr.error('Loading unsuccessful');
            return;
        }

        this.setState({
            title: res.title,
            image: res.image,
            category: res.category,
            description: res.description,
            creator: res.creator,
            counter: res.counter,
            lmt: res._kmd.ect,
        });
        this.setState({username: localStorage.getItem('username')});


        // GET COMMENTS FOR POST
        const resComments = await getCommentsOfPost(this.props.match.params.id);
        this.setState({commentLoader: false});

        let commentsWithAvatars = [];

        // GET COMMENT INFO WITH UPDATED AVATARS
        for (let obj of resComments) {
            const res = await getDetailsOfUser(obj.username);

            let commentObj = {
                username: obj.username,
                comment: obj.comment,
                postId: obj.postId,
                lmt: obj._kmd.ect,
                userAvatar: res[0].avatar
            };

            commentsWithAvatars.push(commentObj);
        }

        this.setState({comments: commentsWithAvatars});

        if (resComments.success === false) {
            toastr.error('Loading comments unsuccessful');
            return;
        }


    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        // POST COMMENT
        const resComment = await postComment(this.state.username, this.state.commentText, this.props.match.params.id);

        if (resComment.success === false) {
            toastr.error('Commenting unsuccessful');
            return;
        }
        this.refs.form.reset();
        console.log(resComment);


        // LOAD COMMENTS AFTER COMMENTING
        const resComments = await getCommentsOfPost(this.props.match.params.id);

        if (resComments.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        this.setState({comments: resComments});
        console.log(this.state.comments);
    }

    async deleteCmt(id) {
        const resDelete = await deleteComment(id);

        if (resDelete.success) {
            toastr.success('Comment Deleted');
        }

        // REFRESH COMMENTS FOR POST
        const resComments = await getCommentsOfPost(this.props.match.params.id);

        if (resComments.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        this.setState({comments: resComments});
        console.log(this.state.comments);
    }

    async deletePostById(id) {
        const resDeletePost = await deletePost(id);
        const resDelete = await deleteCommentsOfPost(id);
        if (resDelete.success === false) {
            toastr.error('Delete failed');
            return;
        }
        this.props.history.push('/');
    }

    calcTime(dateIsoFormat) {

        let diff = new Date() - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    render() {
        return (
            <main>
                <div className="detailed">
                    <div className="wp-content">
                        <h1>{this.state.title}</h1>

                        <div className="details-image" style={{backgroundImage: "url(" + `${this.state.image}` + ")"}}>
                        </div>

                        <div className="responsive-details">
                            <p className="details-p-left">
                                <span>{this.state.creator}</span> in {this.state.category}&ensp;- {this.calcTime(this.state.lmt)} ago
                            </p>
                            <p className="details-p-right">{this.state.counter} views</p>

                            <h3>Description</h3>
                            <div className="description">
                                <p>{this.state.description}</p>
                            </div>
                        </div>


                    </div>
                    <br/>


                    <div className="responsive-details">
                        {this.state.imgLoader ? <div>
                            <div className="spinner">
                                <div className="rect1"/>
                                <div className="rect2"/>
                                <div className="rect3"/>
                                <div className="rect4"/>
                                <div className="rect5"/>
                            </div>
                        </div> : <span/>}
                        {/* PROPERTIES */}
                        <div className="properties">

                            <button className="btn btn--default shiny btn-download"><a href={this.state.image}
                                                                                       download>Download</a></button>
                            {this.state.creator === localStorage.getItem('username') ? <span>
                                <Link to={`/edit/${this.props.match.params.id}`}><button className="btn btn--default shiny btn-edit">Edit</button></Link>
                                    <button onClick={() => {
                                        this.deletePostById(this.props.match.params.id)
                                    }} className="btn btn--default shiny btn-delete">Delete</button>
                                </span> : <span/>}

                        </div>
                        <hr/>

                        {/*COMMENT SECTION*/}
                        <div className="comments-section">
                            <h2>Comments</h2>

                            <form onSubmit={this.onSubmitHandler} className="submit" ref="form">
                                <textarea onChange={this.onChangeHandler} name="commentText" className="text-area"
                                          cols="50" rows="5"/>
                                <button type="submit" className="btn btn--default shiny btn-edit">Submit</button>
                            </form>



                            <div className="comments-wrapper">
                                {this.state.commentLoader ? <div  className="comments-wrapper">
                                    <div className="comment-spinner">
                                        <div className="rect1"/>
                                        <div className="rect2"/>
                                        <div className="rect3"/>
                                        <div className="rect4"/>
                                        <div className="rect5"/>
                                    </div>
                                </div> : <span/>}

                                {this.state.comments.map((comment, index) => {
                                    return (
                                        <span key={index}>
                                        <div className="comment">
                                        <span>
                                           {comment.username === localStorage.getItem('username') ?
                                               <span onClick={() => {
                                                   this.deleteCmt(comment._id)
                                               }} className="hiks">delete</span> : <span/>}
                                        </span>
                                        <p className="uploaded-by"><img src={comment.userAvatar} alt="rizz"/><span
                                            className="commentator">{comment.username}</span>&ensp;{this.calcTime(comment.lmt)} ago</p>
                                        <p>{comment.comment}</p>
                                        </div>
                                    </span>
                                    )
                                })}

                                {!this.state.commentLoader ? this.state.comments.length === 0 ?  <p>No comments yet.</p>: <span/> : <span/>}

                            </div>
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Details)