import React, { useState } from 'react'
import UseWords from '../hooks/useWords'
import { Link, useParams } from 'react-router-dom'
import Prompt from './prompt'

export default function Lvl() {

    const {lvl} = useParams()




    const [answer , setAnswer] = useState("")
    const [warn , setWarn] = useState()
    let [ans , setAns] = useState([])
    let [tries , setTries] = useState(5)
    // let [level , setLevel] = useState(0)
    let [key , setKey] = useState(0) //to re-render the app when i didn't pass a level
    // let [hints , setHints] = useState(10)
    // let [tuto , setTuto] = useState(false)

    const words = UseWords()


    

//---------------------------------------------------------------

    let word_tab = [] 
    let ans_tab = [] 
    let dbWords = []

    ans.map((at)=>ans_tab.push(...at)) 

   if(words !== "Loading" && words.length !== 0){

    dbWords = words.filter(w=>w.id === lvl)[0]

     //caracteres loop
     for(let i=0 ; i < dbWords.letters.length ; i++){
        for(let j=0 ; j < dbWords.letters[i].length ; j++){
            word_tab.push(dbWords.letters[i].charAt(j))
        }
    }//loop to push all the caracteres of a level in word_tab to display them
    
    //splice loop
    for (let index = 0; index < ans_tab.length; index++) {
        for (let k = 0; k < word_tab.length; k++) {
            if(ans_tab[index] === word_tab[k]){
                word_tab.splice(k , 1)
                break //if there caracteres that are duplicated we remove the first one only
            }
        }
    } //loop to remove buttons of the letters of a correct answer
   }

    word_tab.sort()


//---------------------------------------------------------------Our functions

    function handleInteractions(){

        let correct = dbWords.letters.find(wd=>wd === answer) 
        let dup = ans.find(an=>an === answer) //duplicated word

        if(answer === ""){
            setWarn(()=><p id='warning'><span id='warnin_pointer'></span> type an answer</p>) //passing a function containing html elements in setWarn
        }
        else if(dup !== undefined){
            setWarn(()=><p id='warning'><span id='warnin_pointer'></span> this word is already there</p>)
        }
        else{
            if(correct){
                setAns([...ans , correct])
                setTries(tries<5 ? tries+=1 : tries)
            }
            else{
                setTries(tries>0 ? tries-=1 : tries)
            }
            setWarn('')
        }
        setAnswer('') //to make room for the other answer
        unfocussed_btns()
    }

    function focussed_btns(id){
        document.getElementById(id).style.backgroundColor = "rgb(90, 26, 149)"
        document.getElementById(id).disabled = true //to disable the clicked letter
    }

    function unfocussed_btns(){
        let btns = document.querySelectorAll('.btns>input')
        for (let index = 0; index < btns.length; index++) {
            btns[index].style.backgroundColor = "blue"
            btns[index].disabled = false
        }
    }
    
  return (
    (words !== "Loading" && words.length !== 0) && <div className='container' key={key}>
            {/* key === 0 to show the tutorial once */}
            <form>
                <main>
                    <p>{`{ `}Category : <span style={{textTransform : 'uppercase'}}>{dbWords.category}</span>{` }`}</p>
                    <header style={{backgroundImage : `url(${dbWords.image})`}}><div><p>{dbWords.maker}</p></div></header>
                    <aside className='infos'>
                        <div id='objective'><span id='pointer'></span><p id='nbre_words'>you have to get { dbWords.letters.length - ans.length} word(s)</p></div>
                    </aside>
                </main>
                <article>
                    <p id='tries'>you have <span id='span_try' key={tries} >{tries}</span> tries</p>
                    <div id='warn_cont'>{warn}</div>
                    <section className='inputs'>
                        <fieldset id='answer'>
                            <legend>ANSWER</legend>
                            <input id='answer_inp' type='text' value={answer} disabled/>
                        </fieldset>
                        <div className='ops_btns'>
                            <input id='check' type='button' value={"CHECK"} onClick={handleInteractions} />
                            <input id='del' type='button' value={"DEL"} onClick={()=>{setAnswer("") ; unfocussed_btns()}} />
                            {/* <input id='restart' type='button' value={"RESTART"} onClick={()=>{window.location.reload() ; alert("Do you want to restart to level 1 ?")}} /> */}
                        </div>
                    </section>
                    <div className='btns'>
                        {
                            word_tab.map((wrd , idx)=>
                            <input 
                                type='button'
                                key={idx} 
                                id={idx}
                                value={wrd} 
                                readOnly 
                                onClick={(e)=>{setAnswer(answer+e.target.value) ; focussed_btns(idx.toString()) }}
                            />)
                        }
                    </div>
                    <footer>
                        <p style={{opacity : .2}}>MADE BY ANAS BOUSSALEM</p>
                    </footer>
                    <hr></hr>
                    <div id='ans_cont'>
                        <ol>
                        {
                            ans.map((a , i)=><li key={i}>{a}</li>)
                        }
                        </ol>
                    </div>
                </article>
            </form>

            {
                tries===0 ? 
                <Prompt 
                    onPassLvl={()=>{setKey(key+1) ; setTries(5)}}
                    lvl={"this fan lvl"} 
                    lvl_info={"RETRY"} 
                    result={"DIDN'T PASS"}
                />
                : 
                ans.length === dbWords.letters.length &&
                <Prompt                
                    onPassLvl={()=><Link to="/Game_Crash/FanLvl">Return</Link>}     
                    lvl_info={<Link to="/Game_Crash/FanLvl">Return</Link>} 
                    result={"COMPLETED THE"}  
                />
            } 
        </div> 
    )
}
