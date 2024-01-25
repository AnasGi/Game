import axios from 'axios'
import { useEffect, useState } from 'react'

export default function UseWords() {
    const [word , setWord] = useState([])
    const [isLd , setIsld] = useState(true)


    useEffect(()=>{
        const getData = async()=>{
            await axios.get("https://fan-levels.onrender.com/words")
            .then((res)=>setWord(res.data))
            .catch((err)=>console.log('ERROR'))
        }

        getData()
        setIsld(false)
    } , [])

    return !isLd ? word : 'Loading'

}
