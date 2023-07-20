import { useState } from 'react';
import './App.css';
import {FaSearch} from "react-icons/fa";
import {FcSpeaker} from "react-icons/fc"
import  Axios from 'axios';

function App() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState('');

  function getMeaning(){
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${search}`)
    .then((response)=>{
      setData(response.data[0]);
    });
  }

  function playAudio() {
    if (data && data.phonetics && data.phonetics.length > 0) {
      const audioUrl = data.phonetics[0].audio;
      if (audioUrl) {
        let audio = new Audio(audioUrl);
        audio.play();
      } else {
        console.error("No audio URL found in the data.");
      }
    } else {
      console.error("No phonetics data found in the data.");
    }
  }

  return (
    <div className="App">
      <h1>Dictionary App</h1>
      <div className="searchbox">
        <input type="text" 
        placeholder='search ...'
        onChange={(e)=>{
          setSearch(e.target.value)
        }}/>
        <button onClick={()=>{
          getMeaning();
        }}><FaSearch size = "20px"/></button>
      </div>
      {
        data && (
          <div className='showResult'>
            <h2>
              {
                data.word
              }{''}
              <button onClick={()=>{
                playAudio();
              }}> <FcSpeaker size = "26px"/></button>
            </h2>
            <h4>Speech Displays Here</h4>
            <p>{data.meanings[0].partOfSpeech}</p>
            <h4>Definition</h4>
            <p>{data.meanings[0].definitions[0].definition}</p>
            <h4>Examples</h4>
            <p>{data.meanings[0].definitions[0].example}</p>
          </div>
        )
      }
    </div>
  );
}

export default App;
