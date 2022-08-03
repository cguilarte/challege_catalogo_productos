import React from 'react'
import './styles.scss'

const Button = ({ children, ...other }) => {
    return (
        <button className='btnAccion' {...other}>{children}</button>
    )
}

export default Button