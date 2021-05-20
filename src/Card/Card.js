import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className="card" key={props?.id}>
            <div className="card__img">   
                <img src={props?.image} alt="" />
            </div>
            <div className="card__info">
                <h2 className="title">{props?.name}</h2>
                <h4>{props?.profession}</h4>
                <h5>Skills: </h5>
                <span className="skills">
                    {props?.skills}
                </span>
            </div>
        </div>
    )
}

export default Card
