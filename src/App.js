import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {

  const [cards,setCards] =useState([])
  const [turns,setTurns] =useState(0)
  const [firstChoise,setFirstChoise] =useState(null)
  const [secondChoise,setSecondChoise] =useState(null)


  //shuffle cards
  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=> ({...card,id: Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card)=>{
    firstChoise ? setSecondChoise(card) : setFirstChoise(card)
  }

  const resetTurn = ()=>{
    setFirstChoise(null)
    setSecondChoise(null)
    setTurns(prev => prev + 1)
  }


  useEffect(()=>{
    if(firstChoise && secondChoise){
      if(firstChoise.src === secondChoise.src){
        console.log("match!")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === firstChoise.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => {
          resetTurn()
        }, 1000);
        
      }
    }

  },[firstChoise,secondChoise])

  console.log(cards)

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button> 
      <div className='card-grid'>
        {
          cards.map(card => (
            <Card 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === firstChoise || card === secondChoise || card.matched }
              />
          ))
        }
      </div>
    
    </div>
  );
}

export default App;
