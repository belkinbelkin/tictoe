import React from 'react'

const UpperPanel = ({upperPanelColor, upperText, playerOneScore, playerTwoScore}) => 
    <div className={`upper-panel ${upperPanelColor} ${upperText}`}>
        <div className="main-label-container">
            <span>Welcome to TicToe game!</span>
        </div>
        <div className="player-info-container">
            <div className="player-personal-info">
                <span>Player 1</span>
                <span>{playerOneScore}</span>
            </div>
            <span>:</span>
            <div className="player-personal-info">
                <span>{playerTwoScore}</span>
                <span>Player 2</span>
            </div>
        </div>
    </div>


export default UpperPanel