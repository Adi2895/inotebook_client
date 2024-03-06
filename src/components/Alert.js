import React from 'react'
// import { useSelector } from 'react-redux'
const Alert = (props) => {

    // const text = useSelector (state => state.text)
    // const color = useSelector(state => state.color); 
    return (
        
        <div style={{height:'50px', background:"linear-gradient(to bottom right,  rgb(195, 195, 252), rgb(227 198 227), rgb(189 189 225))"}}>
            {
            props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.msg}
                
            </div>
            }
        </div>
    
    )
}

export default Alert

