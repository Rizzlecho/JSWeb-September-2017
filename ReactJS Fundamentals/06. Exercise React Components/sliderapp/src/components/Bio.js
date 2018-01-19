import React, {Component} from 'react'
import Char from './Char'

class Bio extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            curChar: {
                url: ''
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/character/' + this.state.id).then(data => {
            return data.json()
        }).then(parsedData => {
            this.setState({curChar:parsedData})
        })
    }


    render() {
        return (
            <div>
                <fieldset>
                    <Char params={({url:this.state.curChar.url})}/>
                    <p>{this.state.curChar.bio}</p>
                </fieldset>
            </div>
        )
    }
}

export default Bio;