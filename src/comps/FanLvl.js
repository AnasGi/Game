import React from 'react'
import UseWords from '../hooks/useWords'
import { Link } from 'react-router-dom'
import './FanLvl.css'

export default function FanLvl() {

    const words = UseWords()

  return (
    <div className='fan_cont'>
        <div style={{marginBottom : "50px"}}>
            <h1>Fan Levels</h1>
            <div className='Links' >
                <div className='Link_cont'><Link to={"/Game_Crash"}>Home</Link></div>
                <div className='Link_cont'><Link to={"/Game_Crash/AddLvl"}>Create you own levels</Link></div>
            </div>
        </div>
        <div>
            {
                words !== 'Loading' ?
                words.map(wrd=>
                <div key={wrd.id} >
                    <Link to={`/Game_Crash/Lvl/${wrd.id}`}>
                        <div className='fan_lvl_cont'>
                            <div className='fan_lvl_img_cont'>
                                {
                                    wrd.image === "" ? 
                                        <img src="https://www.primarygames.com/langarts/wordguess/logo200.png" alt={wrd.category}/>
                                    : 
                                        <img src={wrd.image} alt={wrd.category}/>
                                }
                            </div>
                            <div className='fan_lvl_info'>
                                <p>{wrd.category}</p>
                                <p>{wrd.letters.length} words</p>
                                <p>Created By {wrd.maker}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                )
                :
                <p style={{textAlign : "center"}}>Loading ...</p>
            }
        </div>
    </div>
  )
}
