import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {deleteCategory, getCategories, postAddCategory} from '../../../api/remote';
import toastr from 'toastr';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            categories: [],
            createFail: false,
            duplicateFail: false,
            createSuccess: false,
            categoryDel: false,
        };


        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.deleteCat = this.deleteCat.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});

    }

    async componentDidMount() {

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

        if (this.state.category === '') {
            this.setState({createFail: true, duplicateFail: false, createSuccess: false, categoryDel: false,});
            return;
        }

        for (let obj of this.state.categories) {
            if (this.state.category.toLowerCase() === obj.toLowerCase()) {
                this.setState({duplicateFail: true, createFail: false, createSuccess: false, categoryDel: false,});
                return;
            }

        }

        const res = await postAddCategory(this.state.category);
        this.refs.createCatg.reset();

        this.setState({createFail: false, duplicateFail: false, createSuccess: true, categoryDel: false,});


        // GETTING CATEGORIES AFTER SUBMIT
        let arrCategories = [];
        const resCategories = await getCategories();

        for (let obj in resCategories) {
            arrCategories.push(resCategories[obj]['category']);
        }
        this.setState({categories: arrCategories});

    }

    async deleteCat(categoryId, e) {
        e.preventDefault();

        const resDelete = await deleteCategory(categoryId);
        this.setState({createFail: false, duplicateFail: false, createSuccess: false, categoryDel: true});

        // GETTING CATEGORIES AFTER SUBMIT
        let arrCategories = [];
        const resCategories = await getCategories();

        for (let obj in resCategories) {
            arrCategories.push(resCategories[obj]['category']);
        }
        this.setState({categories: arrCategories});
    }

    render() {
        return (
            <div>
                <div className="heading">
                    <h1>Admin Panel</h1>
                    <hr/>
                </div>

                <div className="login-page">
                    <div className="form  upload-form">
                        <div className="row header">
                            <div className="large-12 columns">Categories</div>
                        </div>

                        {this.state.createFail ?
                            <div className="shiny btn-delete form-error">Please fill category !</div> : <span/>}
                        {this.state.duplicateFail ?
                            <div className="shiny btn-delete form-error">Category already exists !</div> : <span/>}
                        {this.state.createSuccess ?
                            <div className="shiny btn-download form-error">Category added successfully !</div> : <span/>}
                        {this.state.categoryDel ?
                            <div className="shiny btn-download form-error">Category deleted !</div> : <span/>}

                        <form onSubmit={this.onSubmitHandler} className="admin-form" ref="createCatg">
                            <label htmlFor="title">Add Category</label>
                            <input onChange={this.onChangeHandler} id="title" name="category" type="text"
                                   placeholder="Name"/>

                            <button type="submit" className="btn btn--default shiny btn-login">Create</button>
                        </form>

                        <form className="admin-form">
                            <label htmlFor="select">Delete Category</label>
                            <select name="category" onChange={this.onChangeHandler}>
                                <option value="category"  disabled selected>choose a category</option>
                                {[...this.state.categories].map((category, index) => {
                                    return <option key={index}>{category}</option>
                                })}

                            </select>

                            <button onClick={(e) => {this.deleteCat(this.state.category,e)}}
                                className="btn-delete shiny del-category" type="submit">Delete</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Admin)