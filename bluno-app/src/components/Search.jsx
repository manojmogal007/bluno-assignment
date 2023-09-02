import React, { useState } from 'react'
import '../styles/Search.css'

const Search = () => {

  const [data,setData]=useState({word:'',k:''})
  const [res,setRes]=useState([])
  const [isnull,setIsnull]=useState(false)
  // console.log(res)
  const handlevalues=(e)=>{
    const {value,name}=e.target
    const val=name==='k'?Number(value):value
    setData({...data,[name]:val})

  }

  const handlesearch=(e)=>{
    e.preventDefault()
    let sentences=JSON.parse(localStorage.getItem('sentences')) || [];
    let freobj=JSON.parse(localStorage.getItem('frequency')) || {}
    let lowercaseStr = data.word.toLowerCase();

    if(sentences.length===0){
      setIsnull(true)
      return
    }else if(freobj[lowercaseStr]===undefined){
      setIsnull(true)
      return
    }

    
    // console.log(lowercaseStr)
    let array=freobj[lowercaseStr]
    // console.log(array)
    let temp=[]
    for(let i=0;i<array.length;i++){
      if(array[i][0]>=data.k){
      temp.push(sentences[array[i][1]])
      }
    }
    setRes(temp)
    if(temp.length===0){
      setIsnull(true)
    }else{
      setIsnull(false)
    }
    setData({word:'',k:''})
  }

  const {word,k}=data
  return (
    <div className='search-container'>
      <input className='word-input' type='text' placeholder='Enter word here' name='word' onChange={handlevalues} value={word} />
      <input className='word-input' type='number' placeholder='Enter word frequency' name='k' onChange={handlevalues} value={k} />
      <button className='search-btn' onClick={handlesearch}>Search</button>

      {
        !isnull&&res.length!==0&&res.map((el)=>(
          <p key={el}>{el}</p>
        ))
      }
      {
        isnull&&<p>No result found.....</p>
      }
    </div>
  )
}

export default Search


