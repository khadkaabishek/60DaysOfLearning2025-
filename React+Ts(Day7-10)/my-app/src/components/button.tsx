import React, { useState } from 'react';

interface ButtonProps {
  name: string;
  onClick?: () => void;
}const MyButton: React.FC<ButtonProps> = ({ name, onClick = () => {} }) => {
  const [value, setValue] = useState<number>(1);
  return (
    <>
      <h3>{value}</h3>
      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        {name}
      </button>
    </>
  );
};

export default MyButton;
