import React, { Component } from 'react'
import './App.css'
import CellValue from './components/cell-value/CellValue'
import CellValueEnum from './components/cell-value/CellValueEnum'
import { calculateWinner, gameStatus, emptySpotExists } from './util/Functions'
import UpperPanel from './components/upper-panel/UpperPanel'

let emptyArray = [ 
  [null, null, null], 
  [null, null, null], 
  [null, null, null], 
]

class App extends Component {

  darkModeOn = false

  state = {
      cellArray: emptyArray,
      cellBorderColor: 'black-cell',
      backgroundColor: 'white-background',
      upperPanelColor: 'upper-panel-dark',
      text: 'black-text',
      upperText: 'white-text',
      isPlayerOneTurn: true,
      playerOneScore: 0,
      playerTwoScore: 0,
      lastWinner: '',
      popupIsOpen: false,
  }

  // just for comfort, everyone has a night mode:)
  toggleColor = () => {
      this.darkModeOn = !this.darkModeOn 
      if (this.darkModeOn) {
        this.setState({
          cellBorderColor: 'white-cell', 
          backgroundColor: 'dark-background', 
          upperPanelColor: 'upper-panel-white', 
          text: 'white-text', 
          upperText: 'black-text' 
        }) 
      } else {
        this.setState({
          cellBorderColor: 'black-cell', 
          backgroundColor: 'white-background', 
          upperPanelColor: 'upper-panel-dark', 
          text: 'black-text', 
          upperText: 'white-text'
        }) 
      }
  }

  // handling the click and deciding if we have a winner

  handleCellClick = ({x, y}) => {
    let { cellArray, isPlayerOneTurn, popupIsOpen } = this.state
    if (popupIsOpen || cellArray[x][y] != null) return

      if (isPlayerOneTurn) {
          cellArray[x][y] = CellValueEnum.ONE
      } else {
          cellArray[x][y] = CellValueEnum.TWO
      }

      const result = calculateWinner(cellArray)

      // things that we update anyway for not to do setState() more than one time
      let stateToUpdate = {
        cellArray: cellArray, 
        isPlayerOneTurn: !isPlayerOneTurn
      }

      if (result === gameStatus.UNFINISHED) {
          if (!emptySpotExists(cellArray)) {
            console.log('Tie! ' + result)  
            this.handleTie(stateToUpdate)
          } else {
            this.setState(stateToUpdate)
          } 
      } else {
          console.log('Victory! ' + result)
          this.handleVictory(stateToUpdate, result)
      }
  }


  handleTie = (stateToUpdate) => {
    this.setState({
      ...stateToUpdate,
      popupIsOpen: true,
      playerOneScore: ++this.state.playerOneScore,
      playerTwoScore: ++this.state.playerTwoScore,
      lastWinner: 'Tie'
    })
  }

  handleVictory = (stateToUpdate, result) => {
    if (result === CellValueEnum.ONE) {
        stateToUpdate = { 
          ...stateToUpdate,
          popupIsOpen: true,
          playerOneScore: ++this.state.playerOneScore,
          lastWinner: 'Player 1 won',
        }
    } else {
       stateToUpdate = { 
         ...stateToUpdate,
         popupIsOpen: true,
         playerTwoScore: ++this.state.playerTwoScore,
         lastWinner: 'Player 2 won',
      }
    } 
    this.setState(stateToUpdate)
  }

  closePopup = () => {
    this.setState({ cellArray: [ 
      [null, null, null], 
      [null, null, null], 
      [null, null, null], ], 
      popupIsOpen: false })
  }

  render() {

    const { 
      backgroundColor, 
      cellBorderColor, 
      upperPanelColor, 
      text, 
      upperText, 
      cellArray, 
      isPlayerOneTurn, 
      playerOneScore, 
      playerTwoScore,
      lastWinner,
      popupIsOpen,
    } = this.state
    
    const playerTurnString = (isPlayerOneTurn ? 'Player 1' : 'Player 2') + ' turn'

    return (
          <div className={`container ${backgroundColor}`}>
              <div className="popup" style={{display: popupIsOpen ? 'flex' : 'none'}}>
                  <span style={{margin: '2rem'}}>{lastWinner}!</span>
                  <div style={{marginTop: '2rem'}} onClick={this.closePopup}>
                      <span className="night-mode-button">Close</span>
                  </div>
              </div>
              <UpperPanel 
                  upperPanelColor={upperPanelColor} 
                  upperText={upperText}
                  playerOneScore={playerOneScore}
                  playerTwoScore={playerTwoScore}
              />

              <div className={`night-mode-button ${cellBorderColor} ${backgroundColor} ${text}`} onClick={this.toggleColor}>
                  <span>Night mode</span>
              </div>


              <div className="tictoe-wrapper">
              <div className={`turn-prompt ${text}`}>
                  <span>{playerTurnString}</span>
              </div>
                  <div className={`tictoe-container ${text}`}>
                        <div className="cell-row">
                          <div className={`right-border bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 0, y: 0})}>
                              <CellValue value={cellArray[0][0]}/>
                          </div>
                          <div className={`bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 1, y: 0})}>
                              <CellValue value={cellArray[1][0]}/>
                          </div>
                          <div className={`left-border bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 2, y: 0})}>
                              <CellValue value={cellArray[2][0]}/>
                          </div>
                        </div>

                        <div className="cell-row">
                          <div className={`right-border bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 0, y: 1})}>
                              <CellValue value={cellArray[0][1]}/>
                          </div>
                          <div className={`bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 1, y: 1})}>
                              <CellValue value={cellArray[1][1]}/>
                          </div>
                          <div className={`left-border bottom-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 2, y: 1})}>
                              <CellValue value={cellArray[2][1]}/>
                          </div>
                        </div>
                        
                        <div className="cell-row">
                          <div className={`right-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 0, y: 2})}>
                              <CellValue value={cellArray[0][2]}/>
                          </div>
                          <div className={`white-cell cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 1, y: 2})}>
                              <CellValue value={cellArray[1][2]}/>
                          </div>
                          <div className={`left-border cell ${cellBorderColor}`} onClick={() => this.handleCellClick({x: 2, y: 2})}>
                              <CellValue value={cellArray[2][2]}/>
                          </div>
                        </div>

                  </div>
              </div>
          </div>
    );
  }
}

export default App;
