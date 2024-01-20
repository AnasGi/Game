import React from 'react'
import './crash.css'

export default function Prompt({result , onPassLvl , lvl , lvl_info}) {

  return (
    <div className='prompt'>
        <div>
          <div>
            <h1>YOU {result} LEVEL {lvl}</h1>
            <button onClick={onPassLvl}>{lvl_info}</button>
          </div>
        </div>
    </div>
  )
}
