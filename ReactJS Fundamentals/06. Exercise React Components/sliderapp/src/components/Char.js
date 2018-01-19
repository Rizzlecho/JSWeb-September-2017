import React from 'react'
import observerMenu from './../utils/observer'


let SingleChar = (props) => {
    console.log(props);

    return <div onClick={()=>observerMenu.executeObserver('changeFocus', {id:props.params.id})} className='container'>
        <img
            className='char-img'
            src={props.params.url}
            alt="s"/>
    </div>
};

export default SingleChar