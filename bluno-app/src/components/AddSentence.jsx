import React, { useState } from 'react'
import '../styles/AddSentence.css'

const AddSentence = () => {
    const [sentence,setSentence]=useState('')
    const [isadded,setIsadded]=useState(false)
    console.log(isadded)
    const handlechange=(e)=>{
        setSentence(e.target.value)

    }

    function toggleIsAdded() {
        setIsadded (true)    
    }



    const handlesubmit=(e)=>{
        
        const sentencearray = JSON.parse(localStorage.getItem('sentences')) || [];

        // const words = sentence
        //                 .split(/[\s,.!?]+/) 
        //                 .map(word => {
        //                     const cleanedWord = word.replace(/(^\W+|\W+$)/g, ''); 
        //                     return cleanedWord.toLowerCase(); 
        //                 })
        //                 .filter(word => word.length > 0); 
        const words = sentence
                        .split(/\s+/)
                        .map(word => {
                            const cleanedWord = word.replace(/(^\W+|\W+$)/g, ''); // Remove leading and trailing non-word characters
                            const splitWords = cleanedWord.split(/[\.,!?\s]+/); // Split on '.', ',', '!', '?', or whitespace
                            return splitWords.map(subWord => subWord.toLowerCase()); // Convert to lowercase
                        })
                        .flat()
                        .filter(word => word.length > 0);

        for(let j=0;j<sentence.length;j++){
            if(sentence[j]==='.'||sentence[j]===','||sentence[j]==='!'||sentence[j]==='?'){
                words.push(sentence[j])
            }
        }

        let frequencyobj=JSON.parse(localStorage.getItem('frequency')) || {}
        let obj={}
        for(let i=0;i<words.length;i++){
            let x=words[i]
            if(obj[x]===undefined){
                obj[x]=[1,sentencearray.length]
            }else{
                obj[x][0]++
            }
        }
        // console.log(obj)

        for (let key in obj) {
            if (frequencyobj.hasOwnProperty(key)) {
              frequencyobj[key].push(obj[key]);
            } else {
              frequencyobj[key] = [obj[key]];
            }
          }
        console.log(frequencyobj)
        console.log(frequencyobj.world)

       const updatedarray=[...sentencearray,sentence]

        localStorage.setItem('sentences', JSON.stringify(updatedarray));
        localStorage.setItem('frequency', JSON.stringify(frequencyobj))
        setSentence('')
        // alert('Sentence added successfully')

        setTimeout(() => {
            toggleIsAdded();
          
            // Set isAdded back to false after 2 more seconds
            setTimeout(() => {
                setIsadded (false);
            }, 2000);
          }, 2000);

    }


  return (
    <div className='sentence-container'>
        <div></div>
        <input className='sentence-input' type='text' value={sentence} placeholder='Enter sentence here...' onChange={handlechange} />
        <button className='add-sentence' onClick={handlesubmit}>Add Sentence</button>
        {
            isadded&& <p>Sentence added Successfully ☑️</p>
        }
    </div>
  )
}

export default AddSentence