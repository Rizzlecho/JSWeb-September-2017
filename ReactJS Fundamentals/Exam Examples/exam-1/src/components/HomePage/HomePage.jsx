import React, {Component} from 'react';
import {getYearBalance} from "../../api/remote";
// import ListYearly from './ListYearly.js'
import {Link} from 'react-router-dom'
import YearlyCard from "./YearlyCard";
import {withRouter} from 'react-router-dom'
import toastr from 'toastr'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
        // console.log(this.state.cards);

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        if(!localStorage.getItem('authToken')){
            this.props.history.push('/login');
            return
        }

        this.getData();
        console.log('In home page');
        toastr.success('Successfully loaded data')
    }



    async getData() {
        const res = await getYearBalance(this.props.match.params.id);
        let arrResult = [];

        for (let elem in res) {
            arrResult.push(res[elem]);
        }

        this.setState({cards: arrResult});

        console.log(this.state.cards);
    }




    render() {
        let months = {
            '1': 'January',
            '2': 'February',
            '3': 'March',
            '4': 'April',
            '5': 'May',
            '6': 'June',
            '7': 'July',
            '8': 'August',
            '9': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December'
        };
            
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>

                <div className="row space-top col-md-12">
                {this.state.cards.map((card, i) => {
                    return <YearlyCard key={card.id} id={i+1}  props={card} name={months[i+1]}/>
                })}
                </div>
            </div>
        )
    }
}

export default withRouter(HomePage)