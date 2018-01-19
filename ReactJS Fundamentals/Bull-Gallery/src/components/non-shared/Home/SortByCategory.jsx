import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {getPostsByCategory} from "../../../api/remote";
import toastr from 'toastr';


class SortByCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
        };

        this.calcTime = this.calcTime.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        // GET POSTS BY CATEGORY
        const res = await getPostsByCategory(this.props.match.params.category);
        if (res.error) {
            toastr.error('Loading unsuccessful');
            return;
        }
        toastr.success('Posts Loaded Successfully');

        this.setState({articles: res});

        // window.location.reload();
        // this.props.history.push('/');
        // this.props.history.push(`/${this.props.match.params.category}`);



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
            <div>
                <div className="tile-group">
                    <div className="tile-group-header">
                        <h1 className="section-header pull-left">{this.props.match.params.category}</h1>
                    </div>

                    <div className="tile-group-inner">

                        {[...this.state.articles].map((article, index) => {
                            return (
                                <NavLink key={index} className="tile" to={`/details/${article._id}`}
                                         style={{backgroundImage: "url(" + `${article.image}` + ")"}}>

                                    <div className="tile--content-wrap">
                                        <div className="tile--content"><p
                                            className="tile--date">{this.calcTime(article['_kmd']['lmt'])}</p>
                                            <h2 className="">{article.title}</h2>
                                        </div>
                                        <button className="btn tile--btn btn--default shiny">Details</button>
                                    </div>

                                    <div className="tile-bg"></div>
                                </NavLink>
                            )
                        })}

                        {this.state.articles.length === 0 ? <h1>No images in this category.</h1>: <span/>}

                    </div>

                    <div className="pagination">
                        <p><span>&lt;</span><span>1</span><span>2</span><span>3</span><span>4</span><span>&gt;</span>
                        </p>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(SortByCategory)