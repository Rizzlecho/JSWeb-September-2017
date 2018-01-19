import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getYearBalance} from "../utils/reqHandler";
import toastr from 'toastr';
import BalanceSheet from "../partials/BalanceSheet";

class YearlyBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            months: []
        }
    }


    componentDidMount() {
        this.getData();
    }

    async getData() {
        let monthsArray = [];
        const res = await getYearBalance(this.props.match.params.year);

        if (res.success === false) {
            toastr.error('Loading unsuccessful');
            return;
        }

        for (let obj in res) {
            monthsArray.push(res[obj]);
        }
        toastr.success(`Successful Loading of ${this.props.match.params.year}`);
        this.setState({months: monthsArray});
        console.log(this.state.months);
    }


    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>
                <div className="row space-top col-md-12">
                {
                    [...this.state.months].map((month, index)=>{
                        return <BalanceSheet key={index} id={index+1} props={month} />
                    })
                }
                </div>
            </div>

        )
    }
}

export default withRouter(YearlyBalance)