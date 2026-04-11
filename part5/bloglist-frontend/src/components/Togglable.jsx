import React from 'react'
import {useState, useImperativeHandle} from 'react'
export default function Togglable(props) {
    const [visable, setVisable] = useState(false)
    const hidenWhenVisable = {display: visable ? 'none': ''}
    const showWhenVisable = {display: visable ? '': 'none'}
    const toggleVisibility = () => {
        setVisable(!visable)
    }       
    useImperativeHandle(props.ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <>
            <div style={hidenWhenVisable}>
                <button onClick={toggleVisibility}>{props.label}</button>
            </div>
            <div style={showWhenVisable}>
                {props.children}
                <button onClick={toggleVisibility}>{'cancel'}</button>
            </div>
            
        </>
    )
}