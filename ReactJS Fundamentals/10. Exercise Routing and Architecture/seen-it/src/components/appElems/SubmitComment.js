import React, {Component} from 'react';
import reqHandler from './../../utils/reqHandler';
// import PostDetails from './PostDetails'
import dataCollector from './../../utils/dataCollector';

class SubmitComment extends Component{
    constructor(props){
        super(props);

        this.state={
            postId: this.props.props,
            content: ''
        };

        this.dataCollector = e => {
            this.setState(dataCollector(e));

        };

        this.createComment = e => {
            e.preventDefault();

            reqHandler.createComment(this.state).then(() =>{
                window.location.replace(`/details/${this.state.postId}`);
            })
        }
    }

    componentDidMount(){
        this.setState({
            postId: this.props.props,
            author: localStorage.getItem('username')
        });
    }

    render(){
        return(
            <div className="post post-content">
                {/*{console.log(this.props.props)}*/}
                <form id="commentForm" onSubmit={(e) => {this.createComment(e)}}>
                    <label>Comment</label>
                    {/*{console.log(e)}*/}
                    {/*{ console.log(this.state)}*/}
                    <textarea onChange={(e) => {
                        this.dataCollector(e)
                    }} name="content" type="text"/>
                    <input type="submit" value="Add Comment" id="btnPostComment"/>
                </form>
            </div>
        )
    }
}

export default SubmitComment;