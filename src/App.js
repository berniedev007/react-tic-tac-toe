import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        style={squareStyle} onClick={this.props.setTick}>
          {this.props.mark}
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: ['', '', '', '', '', '', '', '', ''],
      player: 'X',
      winner: ''
    }

    this.resetBoard = this.resetBoard.bind(this);
  }

  setTick(index) {
    if(this.state.items[index] || this.state.winner)
      return;
    let nextItems = this.state.items;
    nextItems[index] = this.state.player;
    const nextPlayer = this.state.player == 'X' ? 'O' : 'X'

    const winner = this.checkWinner(nextItems);
    this.setState({
      items: nextItems,
      player: nextPlayer,
      winner: winner
    })


  }

  checkWinner(items) {
    if(items[0] == items[1] && items[1]== items[2])
      return items[0];
    if(items[3] == items[4] && items[4] == items[5])
      return items[3];
    if(items[6] == items[7] && items[7] == items[8])
      return items[6];
    if(items[0] == items[3] && items[3] == items[6])
      return items[0];
    if(items[1] == items[4] && items[4] == items[7])
      return items[1];
    if(items[2] == items[5] && items[5] == items[8])
      return items[2];
    if(items[0] == items[4] && items[4] == items[8])
      return items[0];
    if(items[2] == items[4] && items[4] == items[6])
      return items[2];
    return '';
  }

  resetBoard() {
    this.setState({
      items: ['', '', '', '', '', '', '', '', ''],
      player: 'X',
      winner: ''
    })
  }

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {this.state.player}</div>
        {this.state.winner ? <div className="winner" style={instructionsStyle}>Winner: {this.state.winner}</div> : ''}
        <button style={buttonStyle} onClick={this.resetBoard}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square mark={this.state.items[0]} setTick={() => this.setTick(0)}/>
            <Square mark={this.state.items[1]} setTick={() => this.setTick(1)}/>
            <Square mark={this.state.items[2]} setTick={() => this.setTick(2)}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square mark={this.state.items[3]} setTick={() => this.setTick(3)}/>
            <Square mark={this.state.items[4]} setTick={() => this.setTick(4)}/>
            <Square mark={this.state.items[5]} setTick={() => this.setTick(5)}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square mark={this.state.items[6]} setTick={() => this.setTick(6)}/>
            <Square mark={this.state.items[7]} setTick={() => this.setTick(7)}/>
            <Square mark={this.state.items[8]} setTick={() => this.setTick(8)}/>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

export default Game;
