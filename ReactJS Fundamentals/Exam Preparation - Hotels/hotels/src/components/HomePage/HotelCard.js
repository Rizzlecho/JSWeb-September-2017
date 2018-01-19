import React from 'react';
import {Link} from 'react-router-dom'

export default function HotelCard({name, image, location, id}) {
    return (
        <article className="hotel-card">
            <img src={image} alt={image}/>
            <p>{name} in {location}</p>
            <Link to={'/details/'+ id}>View Details</Link>
        </article>
    )
}
