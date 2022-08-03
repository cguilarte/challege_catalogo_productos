import React, { forwardRef } from 'react'
import './styles.scss'

const SelectText = forwardRef((props, ref) => {
    const { children, name, label, placeholder, className = '', error, ...other } = props;
    return (
        <div className="rowInput">
            <div className="rowLabel">
                <label>{label}</label>
            </div>
            <div className={`inputUser  ${className}`}>
                <select
                    ref={ref}
                    {...other}
                    name={name}
                    className="inputText"
                >
                    <option value="">{placeholder}</option>
                    {children}
                </select>
            </div>
        </div>
    )
})

export default SelectText