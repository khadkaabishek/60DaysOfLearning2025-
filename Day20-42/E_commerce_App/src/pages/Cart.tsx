import React from "react";
import CartItem from "../components/CartItem";
const Cart : React.FC = ()=> {    
    return <>
     <h1>Your Cart </h1>
     <hr /><hr />
     <CartItem></CartItem>  
     <br />  
     <button style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px" }}>
       Proceed to Payment
    </button>
    </>;

}
export default Cart;