import React from 'react'

export default function Review({rating,comment,user,date}) {
    return (
        <article className='reviews'>
            <header>{user} - {rating}</header>
            <p>{comment}</p>
            <footer>posted on {date}</footer>
        </article>
    )
}