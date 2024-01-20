import React from 'react'

export default function Tutorial({play}) {
  return (
    <div className='tuto_cont'>
        <div className='tuto'>
            <div>
                <p>You have to guess some words that are related to each level category, using the letters you can form the correct word, complete the objective to pass the level </p>
                <button onClick={play}>Let's play</button>
            </div>
        </div>
    </div>
  )
}
