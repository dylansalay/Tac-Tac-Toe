import React, { Component } from 'react';
import './App.css';
import Squares from './Squares'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      turn: 0,
      arr: [],
      player: 'X'
    }
  }
//generate is a function we call to start and restart the game
  generate = () => {
// This function is stating that it is Player X's turn and the turn count is 0
    let { turn, player } =  this.state
    player = 'X'
    turn = 0
    let num = 9
    let arr = []
//The for loop is pushing 9 empty arrays indexes to create the desired number of boxes 
    for(let i=0;i<num;i++){
      arr.push('')
    }
    this.setState({arr, turn, player})
  }

//grabIndex is how we are taking the winning indexes and confirming each winning outcome 
  grabIndex=(a,b,c)=>{
    let{arr}=this.state
    let val1 = arr[a]
    let val2 = arr[b]
    let val3 = arr[c]
    return `${val1}${val2}${val3}`
  }

//winLose is where we are checking each possible winning outcome for X and for O and generating an alert, and restarting the game after each win
  winLose =()=>{
    let { arr, turn} = this.state
    let{grabIndex,generate}=this
    if(grabIndex(0,1,2)==="XXX"||grabIndex(0,1,2)==="OOO"){
      setTimeout(function(){
        alert(`${arr[0]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(3,4,5)==="XXX"||grabIndex(3,4,5)==="OOO"){
      setTimeout(function(){
        alert(`${arr[3]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(6,7,8)==="XXX"||grabIndex(6,7,8)==="OOO"){
      setTimeout(function(){
        alert(`${arr[6]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(0,3,6)==="XXX"||grabIndex(0,3,6)==="OOO"){
      setTimeout(function(){
        alert(`${arr[0]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(1,4,7)==="XXX"||grabIndex(1,4,7)==="OOO"){
      setTimeout(function(){
        alert(`${arr[1]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(2,5,8)==="XXX"||grabIndex(2,5,8)==="OOO"){
      setTimeout(function(){
        alert(`${arr[2]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(0,4,8)==="XXX"||grabIndex(0,4,8)==="OOO"){
      setTimeout(function(){
        alert(`${arr[0]}s WIN`)
        generate()
    }, 100);
    }else if(grabIndex(2,4,6)==="XXX"||grabIndex(2,4,6)==="OOO"){
      setTimeout(function(){
        alert(`${arr[2]}s WIN`)
        generate()
    }, 100);
    }else if(turn === 8){
      setTimeout(function(){
        alert(`Draw`)
        generate()
    }, 100);
    }
  }

//tictTacMark is getting the id of each box and determining whether to place X or O, depending on the turn count.
//It also runs winLose on each click to determine if a winning outcome has occurred
//It also updates activePlayer
  ticTacMark = (e) => {
    let { turn, arr } = this.state
    let id = e.target.id
    if(arr[id]===""){
      if(turn%2 === 0){
        arr[id] = 'X'
        turn = turn +1
        this.setState({turn, arr})
        this.winLose()
      } else if( turn%2 !== 0){
          arr[id] = 'O'
          turn = turn +1
          this.setState({turn, arr})
          this.winLose()
        }
      this.activePlayer()
    }
  }

//activePlayer determines which players turn it is - O for even turns and X for odd turns 
  activePlayer = () => {
    let { player,turn } = this.state
    if(turn % 2 === 0){
      player = 'O'
      this.setState({player}) 
    } else if (turn % 2 !== 0){
      player = 'X'
      this.setState({player})
    }
  }

//componentWillMount is a built-in-function that runs generate on each page load
  componentWillMount(){
    this.generate();
  }
  
  render() {
    const { arr } = this.state;
    return (
      <div>
      <h2>Player: {this.state.player}</h2>
      <div className="board">
      
       {arr.map((value, index) => {
          return (<Squares ticTacMark={this.ticTacMark} arr={this.state.arr} id={index}/>);
        })
        }
        <button onClick={this.generate}>Restart</button>
     </div>
     </div>
    );
  }
}

