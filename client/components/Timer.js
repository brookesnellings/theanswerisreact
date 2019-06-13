import React from 'react'

function Timer(props) {
    return (
        <div id='timer'>
            <h1>{props.timer !== -1 ? props.timer : ''}</h1>
        </div>
    )
}

export default Timer
