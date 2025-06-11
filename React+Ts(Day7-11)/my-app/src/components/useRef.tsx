import React, { useRef, useEffect } from 'react';

const FocusInput:React.FC =()=> {
  const inputRef = useRef<null | any>(null);

  useEffect(() => {
    // Focus the input field when component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
    </div>
  );
}

export default FocusInput;



