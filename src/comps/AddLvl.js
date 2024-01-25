import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './AddLvl.css'

const forbidden_words = ["fuck" , "shit" , "sex" , "dick" , "ass" , "porn"]

export default function AddLvl() {

    const [category , setCategory] = useState('')
    // const [letter , setLetter] = useState('')
    const [letters , setLetters] = useState([])
    const [image , setImage] = useState("")
    const [maker , setMaker] = useState("")
    const [status , setStatus] = useState("")
    const [error , setError] = useState("")
    let [n , setN] = useState(2)
    let [isClick , setIsClick] = useState(false)



    function wordnumber(){

        setIsClick(true)

        let inp = document.getElementById('nbr_words').value
        let cont = document.getElementById('word_cont')
        document.getElementById('up').disabled = true
        document.getElementById('down').disabled = true

        for (let index = 0; index < inp; index++) {

            let word_inp = document.createElement("input")
            word_inp.type = 'text'
            word_inp.className = 'word'
            word_inp.pattern = "^[^ ]*$"


            let btn = document.createElement("button")
            btn.type = 'button'
            btn.onclick = ()=>{
                let wordVal = document.getElementsByClassName('word')[index]
                if(forbidden_words.find(fb=>fb === wordVal.value.replace(/\s/g, '')) === undefined && wordVal.value !== ""){
                    setLetters(prev=>[...prev , wordVal.value.replace(/\s/g, '').toUpperCase()])
                    document.getElementsByClassName('word')[index].disabled = true
                }
            }
            btn.textContent = 'Confirm word'

            cont.append(word_inp)
            cont.append(btn)
        }

    }

    const Lvl_data = {category , letters , image , maker}


    let test = true

    function AddLevel(e){
        e.preventDefault()

        let d = document.f1

        if(d.cat.value === ""){
            setError('You must give a theme to your level')
            test = false
        }
        else if(d.name.value === ""){
            setError('You must give your name')
            test = false
        }
        else if(!isClick || String(letters.length) !== document.getElementById('nbr_words').value){
            setError('You must give some words to your level')
            test = false
        }
        else{
            setError('')
        }
        

        test &&
        axios.post('https://fan-levels.onrender.com/words' , Lvl_data)
        .then((res)=>setStatus(()=><p id='res'>Level Added</p>))
        .catch((err)=>setStatus(()=><p id='err'>Adding the level Interrupted</p>))
    }

  return (
    <div className='addlvl' >
        <div className='msg'>
            <p>Create a new <span id='flash'>level</span></p>
            <div className='Links'>
                <div className='Link_cont'><Link to={"/Game_Crash/FanLvl"}>Go to Fan levels</Link></div>
                <div className='Link_cont'><Link to={"/Game_Crash"}>Home</Link></div>
            </div>
        </div>
        <form name='f1' className='add_form' onSubmit={(e)=>AddLevel(e)}>
            <p id='err'>{error}</p>
            <div>
                <label>Theme</label>
                <input type='text' name='cat' onChange={(e)=>setCategory(e.target.value)}/>
            </div>
            
            <div>
                <label>Image URL</label>
                <input type='text' onChange={(e)=>setImage(e.target.value)}/>
            </div>
            
            <div>
                <label>Creator name</label>
                <input type='text' name='name' onChange={(e)=>setMaker(e.target.value)}/>
            </div>

            <div>
                <label>Words</label>
                <span id='set_nbre_inps'>
                    <input type='number' id='nbr_words' value={n} readOnly />
                    <div>
                        <button type='button' id='up' onClick={(e)=>setN(n < 8 ? n+=1 : n)}>+</button>
                        <button type='button' id='down' onClick={(e)=>setN(n > 2 ? n-=1 : n)}>-</button>
                        <button type='button' onClick={wordnumber}>Confirm</button>
                    </div>
                </span>
            </div>
            <div id='word_cont' style={{display : "block"}}></div>

            <div>
                <input style={{backgroundColor : "blueviolet" , color : 'white' , fontSize : "20px"}} type='submit' value={'Add Level'} />
            </div>

            <div>{status}</div>

            
        </form>
        
    </div>
  )
}
