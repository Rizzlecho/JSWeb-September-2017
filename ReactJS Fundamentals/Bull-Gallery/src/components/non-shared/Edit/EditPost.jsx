import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import toastr from 'toastr';
import {editPost, getCategories, getPostDetails, postUpload} from '../../../api/remote';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            title: '',
            image: '',
            category: '',
            description: '',
            creator: '',
            counter: 0,
            time: '',

            uploadFail: false,
            titleFail: false,
            imageFail: false,
            categoryFail: false,
            descriptionFail: false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async componentDidMount() {


        // GET POST DETAILS
        const res = await getPostDetails(this.props.match.params.id);
        this.setState({
            title: res.title,
            image: res.image,
            category: res.category,
            description: res.description,
            creator: res.creator,
            counter: res.counter,
            time: res._kmd
        });

        // CHECK IF TRIES TO EDIT URL AND NOT CREATOR
        if(localStorage.getItem('username') !== this.state.creator){
            this.props.history.push('/');
            return
        }

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
            lmt: res._kmd.lmt,
        });
        this.setState({username: localStorage.getItem('username')});


        // GETTING CATEGORIES AND PUSHING THEM INTO ARRAY
        let arrCategories = [];
        const resCategories = await getCategories();

        for (let obj in resCategories) {
            arrCategories.push(resCategories[obj]['category']);
        }
        this.setState({categories: arrCategories});
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        // FORM ERROR HANDLING
        if (this.state.title === '' && this.state.image === '' && this.state.category === '' && this.state.description === '') {
            this.setState({
                uploadFail: true,
                titleFail: false,
                imageFail: false,
                categoryFail: false,
                descriptionFail: false
            });
            return;
        }

        if (this.state.title === '') {
            this.setState({
                uploadFail: false,
                titleFail: true,
                imageFail: false,
                categoryFail: false,
                descriptionFail: false
            });
            return;
        }

        if (this.state.image === '') {
            this.setState({
                uploadFail: false,
                titleFail: false,
                imageFail: true,
                categoryFail: false,
                descriptionFail: false
            });
            return;
        }

        if (this.state.category === '') {
            this.setState({
                uploadFail: false,
                titleFail: false,
                imageFail: false,
                categoryFail: true,
                descriptionFail: false
            });
            return;
        }

        if (this.state.description === '') {
            this.setState({
                uploadFail: false,
                titleFail: false,
                imageFail: false,
                categoryFail: false,
                descriptionFail: true
            });
            return;
        }

        //TODO ERROR INVALID CATEGORY

        // PUT REQUEST
        const res = await editPost(
            this.props.match.params.id,
            this.state.title,
            this.state.image,
            this.state.category,
            this.state.description,
            this.state.creator,
            this.state.counter,
            this.state.time
        );
        if (res.success) {
            toastr.success('Post Updated Successfully')
        }
        this.props.history.push(`/details/${this.props.match.params.id}`);
    }


    render() {
        return (

            <div className="login-page">
                <div className="form  upload-form">
                    <div className="row header">
                        <div className="large-12 columns">Edit Post</div>
                    </div>

                    {this.state.uploadFail ?
                        <div className="shiny btn-delete form-error">All fields must be filled !</div> : <span/>}
                    {this.state.titleFail ? <div className="shiny btn-delete form-error">Title must be filled !</div> :
                        <span/>}
                    {this.state.imageFail ? <div className="shiny btn-delete form-error">Image must be filled !</div> :
                        <span/>}
                    {this.state.categoryFail ?
                        <div className="shiny btn-delete form-error">Please choose a category !</div> : <span/>}
                    {this.state.descriptionFail ?
                        <div className="shiny btn-delete form-error">Description must be filled !</div> : <span/>}

                    <form onSubmit={this.onSubmitHandler} className="login-form">
                        <label htmlFor="title">Title</label>
                        <input onChange={this.onChangeHandler} name="title" id="title" type="text" placeholder="Title"
                               value={this.state.title}/>

                        <label htmlFor="image">Image</label>
                        <input onChange={this.onChangeHandler} name="image" id="image" type="text" placeholder="Image"
                               value={this.state.image}/>

                        <label htmlFor="select">Category</label>
                        <select onChange={this.onChangeHandler} name="category" id="select">
                            <option value="category" className="option" disabled
                                    selected="selected">{this.state.category}</option>
                            {this.state.categories.map((category, index) => {
                                return (
                                    <option key={index}>{category}</option>
                                )
                            })}
                        </select>

                        <label htmlFor="description">Description</label>
                        <textarea onChange={this.onChangeHandler} className="textarea-upload" id="description"
                                  name="description" placeholder="Description" value={this.state.description}/>

                        <button className="btn btn--default shiny btn-login" type="submit">Submit</button>
                    </form>
                </div>
            </div>


        );
    }
}

export default withRouter(EditPost);