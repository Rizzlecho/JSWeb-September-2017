import React, {Component} from 'react';
import reqHandler from './../../utils/reqHandler';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            title: '',
            image: '',
            description: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();

        let payload = {
            author: localStorage.getItem('username'),
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            imageUrl: this.state.image
        };

        let postId = this.props.match.params.id;

        console.log('here ' + postId);
        reqHandler.editPost(payload, postId)
            .then(() => {
                window.location.replace(`/details/${postId}`);
            })
    };

   componentDidMount(){
       let postId = this.props.match.params.id;
       console.log(postId);

       reqHandler.getPostDetails(postId)
           .then(post => {
               this.setState({ url: post.url, image: post.imageUrl, title: post.title, description: post.description });
               console.log(this.props.match.params.id);
           })
   }

    render() {
        return (
            <section id="viewEdit">
                {console.log(this.state)}
                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
                        <label>Link URL:</label>
                        <input onChange={this.onChange} name="url" type="text"
                               value={this.state.url}/>
                        <label>Link Title:</label>
                        <input onChange={this.onChange} name="title" type="text" value={this.state.title}/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input onChange={this.onChange} name="image" type="text"
                               value={this.state.imageUrl}/>
                        <label>Comment (optional):</label>
                        <textarea onChange={this.onChange} name="description" value={this.state.description}/>
                        <input id="btnEditPost" type="submit" value="Edit Post"/>
                    </form>
                </div>
            </section>
        )
    }

}

export default EditPost;