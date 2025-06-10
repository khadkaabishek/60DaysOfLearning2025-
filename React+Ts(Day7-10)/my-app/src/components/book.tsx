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

const MyBookDataButton: React.FC<Props> = (props) => {
  const [value, setValue] = useState<BookData>({
    name: "DSA",
    price: 1000
  });

  return (
    <>
      <h3>Name: {value.name} || Price: {value.price}</h3>
      <button
        onClick={() => {
            if(value.name === "DSA"){
              setValue({ name: "Java", price: 1300 });
            }else{
              setValue({ name: "DSA", price: 1000 });
            }
        }}
      >
        {props.name}
      </button>
    </>
  );
};

export default MyBookDataButton;
