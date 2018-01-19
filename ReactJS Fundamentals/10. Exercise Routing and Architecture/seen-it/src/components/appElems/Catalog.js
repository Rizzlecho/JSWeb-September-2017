import React, {Component} from 'react'
import reqHandler from './../../utils/reqHandler'
import Post from './partials/Post'

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        reqHandler.getAllPosts().then(data => {
            this.setState({posts: data})

        })
    }


    render() {
        return (
            <section id="viewCatalog">
                <div className="posts">
                    {this.state.posts.map((post, index) => {
                        return <Post key={post._id} id={index + 1} props={post}/>
                    })}
                </div>
            </section>
        )
    }
}

export default Catalog