import React, {Component} from 'react'

import reqHandler from './../../utils/reqHandler';
import dataCollector from './../../utils/dataCollector';

class Submit extends Component {
    constructor() {
        super();

        this.dataCollector = e => {
            this.setState(dataCollector(e));

        };

        this.createPost = e => {
            e.preventDefault();
            reqHandler.createPost(this.state).then(()=> {
                window.location.replace('/catalog')
            })
        };


    }



    componentDidMount(){
        this.setState({
            author: localStorage.getItem('username')
        })
    }

    render() {
        return (
            <section id="viewSubmit">
                <div className="submitArea">
                    <h1>Submit Link</h1>
                    <p>Please, fill out the form. A thumbnail image is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="submitForm" className="submitForm" onSubmit={(e) => {this.createPost(e)}}>
                        <label>Link URL:</label>
                        <input onChange={(e) => {this.dataCollector(e)}} name="url" type="text"/>
                        <label>Link Title:</label>
                        <input onChange={(e) => {this.dataCollector(e)}} name="title" type="text"/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input onChange={(e) => {this.dataCollector(e)}} name="imageUrl" type="text" />
                        <label>Comment (optional):</label>
                        <textarea onChange={(e) => {this.dataCollector(e)}} name="description"/>
                        <input id="btnSubmitPost" value="Submit" type="submit"/>
                    </form>
                </div>
            </section>
        )
    }
};

export default Submit