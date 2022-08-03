import React from 'react'
import './styles.scss'

const Card = ({ children }) => {
    return (
        <div className="cardBox">
            {children}
        </div>
    )
}

export default Card