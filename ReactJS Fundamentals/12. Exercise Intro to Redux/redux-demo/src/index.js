import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import './index.css';
// import App from './App';
import './App.css'
import registerServiceWorker from './registerServiceWorker';

let generatorReducer = (store, action) => {
    switch (action.type) {
        case 'INCREMENT':
            console.log(action);
            return [
                ...store.slice(0, action.payload.index),
                Object.assign({}, store[action.payload.index],
                    {value: store[action.payload.index].value + action.payload.step}),
                    ...store.slice(action.payload.index + 1)
            ];
        case 'DECREMENT':
            console.log(action);
            return [
                ...store.slice(0, action.payload.index),
                Object.assign({}, store[action.payload.index],
                    {value: store[action.payload.index].value - action.payload.step}),
                ...store.slice(action.payload.index + 1)
            ];
        case 'CLEAR':
            console.log(action);
            return [
                ...store.slice(0, action.payload.index),
                Object.assign({}, store[action.payload.index],
                    {value: 0}),
                    ...store.slice(action.payload.index + 1)
            ];
        case 'ADD_COUNTER':
            return [...store, {index: store.length, value: 0}];
        case 'REMOVE_LAST':
            return [...store.slice(0, store.length - 1)];


        default :
            return store
    }
};

let store = createStore(generatorReducer, [{index: 0, value: 0}]);


const ADD_COUNTER = 'ADD_COUNTER';
const REMOVE_LAST = 'REMOVE_LAST';
const INCREMENT = 'INCREMENT';
const CLEAR = 'CLEAR';
const DECREMENT = 'DECREMENT';

let actionObj = {
    addCounter: () => {
        return {type: 'ADD_COUNTER'}
    },

    removeCounter: () => {
        return {type: 'REMOVE_LAST'}
    },

    increment: (payload) => {
        return {type: 'INCREMENT', payload}
    },

    clear: (payload) => {
        return {type: 'CLEAR', payload}
    },
    decrement: (payload) => {
        return {type: 'DECREMENT', payload}
    },
};


//Child
let Counter = (props) => {
    return (
        <div>
            <h1>{props.props.value}</h1>
            <button onClick={()=>(store.dispatch(actionObj.increment({index: props.props.index, step: 1})))}>Increment
            </button>
            <button onClick={()=>(store.dispatch(actionObj.decrement({index: props.props.index, step: 1})))}>Decrement</button>
            <button onClick={()=>{store.dispatch(actionObj.clear({index: props.props.index}))}} >Clear</button>
        </div>
    )
};


// Parent
let CounterWrap = () => {
    return (
        <div>
            {store.getState().map(counter => {
                return <Counter key={counter.index} props={counter}/>
            })}
            <button onClick={() => {
                store.dispatch(actionObj.addCounter())
            }}>Add Counter
            </button>
            <button onClick={() => {
                store.dispatch(actionObj.removeCounter())
            }}>Remove Counter
            </button>
        </div>
    )
};


store.subscribe(() => {
    ReactDOM.render(<CounterWrap/>, document.getElementById('root'));
});
ReactDOM.render(<CounterWrap/>, document.getElementById('root'));
registerServiceWorker();
