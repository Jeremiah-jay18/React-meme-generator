
import { useState,useEffect } from "react";

function Card(){
    const [allMemes,setAllMemes] = useState([])

    const [meme,setMeme]=useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bi.jjpg"
    })


    function handleChange(event){
        const {name,value}=event.target
        setMeme(prevMeme=>{
            return {...prevMeme,[name]:value}
        })
    }
useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes").then(res=>res.json())
    .then(data=>setAllMemes(data.data.memes))
},[])
   function getMemesImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const {url}=allMemes[randomNumber]
        setMeme(prevMeme=>({
            ...prevMeme,
             randomImage:url,
        }))
        
    }
    
    return(
        <div className="wrapper">

            <div className="head">
                <div className="name"><h3>Meme Generator</h3></div>
                <div className="title"><h4>React Course Project 3</h4></div>
            </div>

            <div className="card-wrap">

                <div className="input-tags">
                    <form action="">
                    <input onChange={handleChange} name="topText" type="text" placeholder="shut up" />
                    <input onChange={handleChange} name="bottomText" type="text" placeholder="and take my money"/>
                    </form>
                    <button onClick={getMemesImage}id="btn">Get a new meme image</button>
                </div>

                <div className="image">
                    <img src={meme.randomImage} alt="" />
                    <div className="image-text top"><h4>{meme.topText}</h4></div> 
                   <div className="image-text bottom"><h4>{meme.bottomText}</h4></div>
                </div>
            </div>

        </div>
    )
}
export default Card