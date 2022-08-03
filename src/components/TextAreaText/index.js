import React, { forwardRef } from 'react'
import './styles.scss'

const TextAreaText = forwardRef((props, ref) => {
    const { name, label, placeholder, error, className = '', ...other } = props;
    return (
        <div className="rowInput">
            <div className="rowLabel">
                <label>{label}</label>
            </div>
            <div className={`inputTextArea ${className}`}>
                <textarea
                    ref={ref}
                    {...other}
                    name={name}
                    className="inputText"
                    placeholder={placeholder}
                    rows={5}
                    cols={5}
                />
            </div>
            {error && <span className='error'>{error}</span>}
        </div>
    )
})

export default TextAreaText