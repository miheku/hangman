import { useEffect, useState } from 'react'
import './App.css'
import ReactConfetti from 'react-confetti'

function App() {
  const text = ["money","python","garden","purchase","hospital","chemistry","today","mouse","mistake","sandwich"]
  const hint = ["dollar dollars $$$","sssssssssssssssssssssssssssssssssssssssssssssssss","flower pots, spades, fertilizers....","fancy way of saying buy","broke your legs go there, need a stitch go there","we need to cook, Mr White","not tomorrow not yesterday","ratatouie","women dont' make","peanut butter jelly _____"]
    let random = Math.floor(Math.random()*text.length)

  const [game,setGame] = useState(generateObject())

  function generateObject(){
    return {
    
    text: text[random].split(""),
    hintText: hint[random],
    key: "abcdefghijklmnopqrstuvwxyz",
    correct: [],
    wrong: [],
    gameOver: false,
    hint: false
  }
  }

  function reset(){
    random = Math.floor(Math.random()*text.length)
    setGame(generateObject())
  }
  const word = game.text.map(
    word => <span key={word}>{game.correct.includes(word)?word:"?"}</span>
  )
  const key = game.key.split("").map(
    key => <button key={key} value={key} onClick={(e)=>check(e)} style={{backgroundColor: `${game.correct.includes(key)?"green":game.wrong.includes(key)?"red":"yellow"}`}}>{key}</button>
  )
  function check(e){
    
    if(game.correct.includes(e.target.value)){

    }
    else{
    game.text.includes(e.target.value)? setGame(prev => ({...prev, correct: [...prev.correct, e.target.value]})): setGame(prev => ({...prev, wrong: [...prev.wrong, e.target.value]}))
    }
    
  }
  useEffect(()=>{
    if(game.wrong.length=== 7){
      setGame(prev => ({...prev, gameOver: true}))
    
    } } ,[game.wrong.length])
  
  useEffect(()=>{
    if(game.correct.toSorted().toString() === game.text.toSorted().toString() ){
      setGame(prev =>({...prev, gameOver:true}))
    }
  },[game.correct.length])

function giveHint(){
  setGame(prev => ({...prev, hint:true, wrong: [...prev.wrong, "hint"]}))
}
  return (
    <>
    {game.correct.length===game.text.length && game.gameOver?<ReactConfetti />:null}
    <div className="container">
      <div className='title' style={{color:`${game.gameOver?"green":"white"}`}}>
        <span style={{color:`${game.correct.length>0 || game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>H</span>
        <span style={{color:`${game.correct.length>1 || game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>A</span>
        <span style={{color:`${game.correct.length>2 || game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>N</span>
        <span style={{color:`${game.correct.length>3|| game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>G</span>
        <span style={{color:`${game.correct.length>4 ||game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>M</span>
        <span style={{color:`${game.correct.length>5 || game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>A</span>
        <span style={{color:`${game.correct.length>6 || game.correct.length===game.text.length && game.gameOver?"green":"white"}`}}>N</span>
      </div>
<div className='word'>
        {word}
      </div>
      <div className='key'>
        {key}
      </div>
          {game.hint===false?<button onClick={giveHint} className='hb'>HINT</button>:null}
      {game.hint?<h1 className='hint'>{game.hintText}</h1>:null}
    </div>
      <div className='img'>
        <h1>{game.wrong.length>0?"H":""}</h1>
        <h1>{game.wrong.length>1?"A":""}</h1>
        <h1>{game.wrong.length>2?"N":""}</h1>
        <h1>{game.wrong.length>3?"G":""}</h1>
        <h1>{game.wrong.length>4?"M":""}</h1>
        <h1>{game.wrong.length>5?"A":""}</h1>
        <h1>{game.wrong.length>6?"N":""}</h1>
      </div>
      {game.gameOver?<button className='reset' style={{backgroundColor:`${game.wrong.length===7?"red":"green"}`}} onClick={reset}>{game.wrong.length===7?"You Lost":"You Win"}</button>:null}
    </>
  )
}

export default App
