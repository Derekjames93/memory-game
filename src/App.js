import './components/MemoryCard'
import './App.css';

import MemoryCard from './components/MemoryCard';
import { Component, useState } from 'react';


function generateDeck() {
  let symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
  let deck = []
  for (let index = 0; index < 16; index++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[index % 8]
    })

  }
  return shuffle(deck)
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



class App extends Component {
  
  // const [deck, setDeck] = useState(generateDeck());
  // const [pickedCards, setPickedCards] = useState([])

  constructor(props){
    super(props)
    this.state= {
      deck: [],
      pickedCards: []
    }
  }
      
    
  

reset = () => {
  this.setState({
    deck:generateDeck(),
    pickedCards:[]
  })
}

pickCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped) {
      return
    }
    const cardToFlip = {...this.state.deck[cardIndex]}
    cardToFlip.isFlipped = true

    let newPickedCards = this.state.pickedCards.concat(cardIndex)

    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    })
    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0]
      let card2Index = newPickedCards[1]

      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(() => {this.unflipCards(card1Index,card2Index)},1000)
        
      }
      newPickedCards = []
    } 
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    })
    
  }


unflipCards = (card1Index,card2Index) => {
    const card1 =  this.state.deck[card1Index]
    let card2 = this.state.deck[card2Index]
    card1.isFlipped = false
    card2.isFlipped = false

    const newDeck = this.state.deck

    newDeck.map((card, index) => {
      if (card1Index === index) {
        return card1
      } if (card2Index === index){
        return card2

      }
      return card;
    })
    
      
   
    this.setState({
      deck:newDeck
    })

  };


  render() {

  
    console.log(this.state.deck)
    const cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard pickCard={() => {this.pickCard(index)}} key={index} symbol={card.symbol} isFlipped={card.isFlipped} />
    });
    return (
      <div className="App">
        <header className="App-header">
       
          <h1 className="shadow">Memory Game</h1>
          <h3>Match cards to win!</h3>

        </header>

        <div>
          {cardsJSX.slice(0, 4)}
        </div>
        <div>
          {cardsJSX.slice(4, 8)}
        </div>
        <div>
          {cardsJSX.slice(8, 12)}
        </div>
        <div>
          {cardsJSX.slice(12, 16)}

        </div>
        <button onClick={this.reset}>Reset</button>


      </div>
    );

  }
}

export default App;
