import React, { useState } from 'react';

const Joke = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const result = await response.json()
      console.log("result",result);
      setJoke(`id: ${result.id} setup: ${result.setup} punchline: ${result.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <>
      <div className='jokeContainer'>
        <p>Listen Unlimited jokes here...</p>
      <input type='button' value='Enter for Joke' onClick={fetchJoke} />
      {joke && <p>{joke}</p>}
      </div>
    </>
  );
};

export default Joke;
