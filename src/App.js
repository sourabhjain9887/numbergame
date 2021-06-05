import React,{useState, useEffect} from 'react';
import './App.css';


function App() {
  const [score,setScore]=useState(20);
  const [highScore, setHighScore] = useState(0);
  const [input, setInput] = useState();
  const [toggle, setToggle] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [comment, setComment] = useState('Start guessing...') 
  const [isCorrect, setIsCorrect] = useState(false); 
  const [ans, setAns] = useState('?');
  const [disable, setDisable] = React.useState(false);

  useEffect(() => {
    const rand =  Math.floor(Math.random() * 20) + 1;
    setRandomNumber(rand);
  }, [toggle])


  const gameHandler=()=>{
    setToggle(!toggle);
    setScore(20);
    setAns('?');
    setComment('Start guessing...');
    setInput('');
    setDisable(false);
  }


  const clickHandler = (e)=>{
    e.preventDefault();
    if(input === ''){
      setComment("Enter a number and Check");
    }else if(Number(input)===randomNumber){
      setComment("Correct answer!");
      setAns(randomNumber);
      setIsCorrect(!isCorrect);
      if(score>highScore){
        setHighScore(score);
      }
      setDisable(true);
    }else if(Number(input)<=20){
      var score1=score-1;
      if(score1 === 0){
        setComment('You loose the game!');
        setScore(0);
      }else if(score1>0){
        setScore(score1);
        if(Number(input)>randomNumber){
          setComment('Too high!');
        }else if(Number(input)<randomNumber){
          setComment('Too low!');
        }
      }
    }else if(Number(input)>20){
      setComment('Please choose a number between 1 and 20')
    }
  }

  return (
    <div className="App">
      <div className="header">
        <button onClick={gameHandler}>Play Again!</button>
        <h3>{`<Guess a Number Between 1 and 20>`}</h3>
      </div>
      <div className="subHeader">
        <h1>Guess My Number!</h1>
      </div>
      <div><hr></hr><b>{ans}</b><hr></hr></div>
      <div className='content'>
        <div className='leftContent'>
          <form onSubmit={clickHandler} className='form'>
            <input className='input' type='number' min='1'  value={input} disabled={disable}
              onChange={(e)=>setInput(e.target.value)}>
            </input>
            <button disabled={disable} type='submit'>Check!</button>
          </form>
        </div>
        <div className='rightContent'>
          <div className='rightHeading-1'>
            <h2>{comment}</h2>
          </div>
          <div className='rightHeading-2'>
            <div className='score'> Score: {score}</div>
            <div className='highScore'>Highscore: {highScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
