import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {getAllPosts, getMostViewedPosts} from "../../../api/remote";
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            mostViewedArticles: [],
            loader: true,
        };

        this.calcTime = this.calcTime.bind(this);
    }

    componentDidMount() {
        this.getData();
    }


    async getData() {

        // GET ALL POSTS
        const res = await getAllPosts();

        this.setState({loader: false});
        if (res.error) {
            toastr.error('Loading unsuccessful');
            return;
        }

        this.setState({articles: res});


        // GET MOST VIEWED POSTS
        const resViews = await getMostViewedPosts();

        if (res.error) {
            toastr.error('Loading unsuccessful');
            return;
        }

        this.setState({mostViewedArticles: resViews});

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
                        <h1 className="section-header pull-left">Recently Uploaded Images</h1>
                    </div>

                    <div className="tile-group-inner">
                        {this.state.loader ? <div style={{border: 'solid rgb(28, 33, 43)'}} className="tile-group-inner">
                            <div className="spinner">
                                <div className="rect1"/>
                                <div className="rect2"/>
                                <div className="rect3"/>
                                <div className="rect4"/>
                                <div className="rect5"/>
                            </div>
                        </div> : <span/>}


                        {[...this.state.articles].map((article, index) => {
                            return (
                                <NavLink key={index} className="tile" to={`/details/${article._id}`}
                                         style={{backgroundImage: "url(" + `${article.image}` + ")"}}>

                                    <div className="tile--content-wrap">
                                        <div className="tile--content"><p
                                            className="tile--date">{this.calcTime(article['_kmd']['ect'])}</p>
                                            <h2 className="">{article.title}</h2>
                                        </div>
                                        <button className="btn tile--btn btn--default shiny">Details</button>
                                    </div>

                                    <div className="tile-bg"></div>
                                </NavLink>
                            )
                        })}

                    </div>



                    <div className="pagination">
                        <p><span>&lt;</span><span>1</span><span>2</span><span>3</span><span>4</span><span>&gt;</span>
                        </p>
                    </div>
                </div>


                <hr className="hor-line"/>

                <div className="tile-group">
                    <div className="tile-group-header">
                        <h1 className="section-header pull-left">Most Viewed Six</h1>
                    </div>

                    <div className="tile-group-inner">
                        {this.state.loader ? <div style={{border: 'solid rgb(28, 33, 43)'}} className="tile-group-inner">
                            <div className="spinner">
                                <div className="rect1"/>
                                <div className="rect2"/>
                                <div className="rect3"/>
                                <div className="rect4"/>
                                <div className="rect5"/>
                            </div>
                        </div> : <span/>}

                        {[...this.state.mostViewedArticles].map((article, index) => {
                            return (
                                <NavLink key={index} className="tile" to={`/details/${article._id}`}
                                         style={{backgroundImage: "url(" + `${article.image}` + ")"}}>

                                    <div className="tile--content-wrap">
                                        <div className="tile--content">
                                            {article.counter === 0 ?
                                                <p className="tile--date">No views yet</p> :
                                                <p className="tile--date">{article.counter} views</p>
                                            }


                                            <p className="tile--date">{this.calcTime(article._kmd['lmt'])} ago</p>
                                            <h2 className="">{article.title}</h2>
                                        </div>
                                        <button className="btn tile--btn btn--default shiny">Details</button>
                                    </div>

                                    <div className="tile-bg"></div>
                                </NavLink>
                            )
                        })}
                    </div>

                    <div className="pagination"></div>


                </div>
            </div>
        );
    }
}

export default withRouter(HomePage)