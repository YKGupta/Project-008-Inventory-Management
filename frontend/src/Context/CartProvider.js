import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);

    const updateCartItems = ({ item, frequency }) => {

        const newCartItems = [...cartItems];
        
        const index = newCartItems.findIndex((value) => value.item._id === item._id);
        
        let cartItem = index !== -1 ? newCartItems[index] : null;

        if(index === -1 && frequency > 0)
        {
            cartItem = {
                item,
                frequency
            };

            newCartItems.push(cartItem);
        }

        if(!cartItem)
            return;
        
        if(frequency === 0)
        {
            // Remove item
            newCartItems.splice(index, 1);
        }
        else
        {
            // Update item
            cartItem.frequency  = frequency;
        }

        setCartItems(newCartItems);

    };

    const fetchCartItem = (item) => {
        return cartItems.find((value) => value.item._id === item._id);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, updateCartItems, fetchCartItem }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;