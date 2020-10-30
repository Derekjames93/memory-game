import React from 'react';
import './MemoryCard.css';
import logo from './logo.png'
import midoriya from './midoriya.jpg'
import todoroki from './todoroki.jpg'
import allmight from './allmight.jpg'
import eraser from './eraserhead.jpg'
import bakugo from './bakugo.jpg'
import mirko from './mirko.jpg'
import hawks from './hawks.jpg'
import momo from './momo.jpg'



class MemoryCardBack extends React.Component{
    
    


    render(){
        const images = {'∆':allmight, 'ß':todoroki, '£':eraser, '§':bakugo, '•':mirko, '$':hawks, '+':momo, 'ø':midoriya}
        let innerClass = "MemoryCard--Inner"
        if(this.props.isFlipped === true){
            innerClass += ' flipped'
        }
        return (
            <div className="MemoryCard" onClick={this.props.pickCard}>
                <div className={innerClass}>
                    
                    <div className="MemoryCard--Back">
                        <img src={logo} alt=""></img>
                        
                    </div> 
                    
                    <div className="MemoryCard--Front">
                        <img src={images[this.props.symbol]} alt=""></img>
                        
                    </div>
                
                </div>


            </div>
        )
    }
}

export default MemoryCardBack;