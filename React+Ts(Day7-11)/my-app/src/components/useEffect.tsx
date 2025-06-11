import React, { useState, useEffect } from 'react';

const  Counter:React.FC = ()=>{
  const [count, setCount] = useState<number>(0);

  // useEffect runs after every render (because of [count] dependency)
  useEffect(() => {
    console.log(`Count updated: ${count}`);
  }, [count]); // Only runs when 'count' changes

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
