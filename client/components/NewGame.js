import React from 'react'

export default function NewGame(props) {
    return (
        <div>
            <div id='popup-container'></div>
            <div id='popup'>
                <div id='popup-title'>number of players</div>
                <div id='popup-select'>
                    <ul>
                        <li onClick={() => { props.handleNumberOfPlayers(1) }}>1</li>
                        <li onClick={() => { props.handleNumberOfPlayers(2) }}>2</li>
                        <li onClick={() => { props.handleNumberOfPlayers(3) }}>3</li>
                        <li onClick={() => { props.handleNumberOfPlayers(4) }}>4</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

