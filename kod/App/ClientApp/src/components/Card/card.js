import React from 'react'
import './card.css'

const Card = (props) => {
    const { imageUrl, title, onClick } = props;

    return (<div onClick={onClick} className="cardContainer">
        <div className="card">
            <div className="img" style={{ backgroundImage: `${imageUrl ? 'url(' + imageUrl + ')' : ""}` }}></div>
            <div className="center title-wrap">
                <h3 className="title">{title}</h3>
            </div>

        </div>
    </div>)
}

export default Card;