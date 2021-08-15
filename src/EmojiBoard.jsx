import React from 'react';
import { generate } from "short-id";
import EmojiBubble from './EmojiBubble';


const random = (seed) => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const randomNumber = (max, min, seed) => {
    seed += new Date().getTime()
    return Math.floor(random(seed) * (max - min + 1)) + min;
}

const randomPosOrNeg = (max, min, seed) => {
    seed += new Date().getTime()
    let randomNumber = Math.floor(random(seed) * (max - min + 1)) + min;

    randomNumber *= Math.floor(random(seed) * 2) === 1 ? 1 : -1;

    return randomNumber;
}

const EmojiBoard = props => {

    const emojiLabelToSymbol = {
        "thumbs_up": "👍",
        // "thumbs_down" : "👎",
        "i_love_you" : "🤟",
        "victory": "✌️",
    }

    return (
        <div>
            <div>
                {props.emojiQueue.map(( {label} , index) => {
                    return <EmojiBubble
                        key={generate()}
                        label={label}
                        symbol={emojiLabelToSymbol[label]}
                        size={randomNumber(8, 2, index)}
                        left={randomNumber(200, 0, index)}
                        one={randomPosOrNeg(400, 50, index)}
                        two={randomPosOrNeg(300, 50, index)}
                    />
                })}
            </div>
        </div>
    )
}

export default EmojiBoard