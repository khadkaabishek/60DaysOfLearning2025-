import React, { useState } from "react";

// Data interface
interface BookData {
  name: string;
  price: number;
}

// Props interface
interface Props {
  name: string;
}

const MyBookDataButton: React.FC<Props> = ({ name }) => {
  const [value, setValue] = useState<BookData>({
    name: "DSA",
    price: 1000
  });

  return (
    <>
      <h3>Name: {value.name} || Price: {value.price}</h3>
      <button
        onClick={() => {
          setValue({ name: "Java", price: 300 });
        }}
      >
        {name}
      </button>
    </>
  );
};

export default MyBookDataButton;
