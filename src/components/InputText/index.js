import React, { forwardRef } from 'react'
import './styles.scss'

const InputText = forwardRef((props, ref) => {
    const { name, label, type = 'text', placeholder, className = '', error, ...other } = props;
    return (
        <div className="rowInput">
            <div className="rowLabel">
                <label>{label}</label>
            </div>
            <div className={`inputUser  ${className}`}>
                <input
                    ref={ref}
                    {...other}
                    name={name}
                    className="inputText"
                    type={type}
                    placeholder={placeholder}
                />

            </div>
            {error && <span className='error'>{error}</span>}
        </div>
    )
})

export default InputText