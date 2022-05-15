import "./card.css"

export default function Card({card,handleChoice}) {

    const handleClick =()=>{
        handleChoice(card)
    }

  return (
    <div className="card">
    <div>
      <img className='front' src={card.src} alt="card front" />
      <img  className='back' 
            src='/img/cover.png' 
            alt='card-back'
            onClick={handleClick}/>
    </div>
  </div>
  )
}
