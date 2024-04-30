import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from "./CartContext";
import AlertContext from "./AlertContext";
import ProgressContext from "./ProgressContext";

const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const host = "http://localhost:5000";
    const { alertSetter } = useContext(AlertContext);
    const { setProgress } = useContext(ProgressContext);

    const getAllOrders = async () => {

		setProgress(10);		
		
		try
		{
			const response = await fetch(`${host}/api/order/getall${localStorage.getItem('admin') === 'false' ? 'user' : ''}`, {
				method: "GET",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});

			setProgress(50);
			
			const json = await response.json();
			
			setProgress(90);

			if(json.success)
			{
				setOrders(json.orders);
			}
			else
			{
				alertSetter({ message: json.message, type: "danger"});
			}
		}
		catch(error)
		{
			alertSetter({ message: error, type: "danger"});
		}
		finally
		{
			setProgress(100);		
		}
	}

    const placeOrder = async () => {

        setProgress(10);

        try {
            const response = await fetch(`${host}/api/order/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalPrice: totalCost
                })
            });

            setProgress(50);

            const json = await response.json();

            setProgress(90);

            if (json.success) {
                // Update frontend
                alertSetter({ message: json.message, type: "warning" });
                setCartItems([]);
                navigate('/orders');
            }
            else {
                alertSetter({ message: json.message, type: "danger" });
            }

        }
        catch (error) {
            alertSetter({ message: error, type: "danger" });
        }
        finally {
            setProgress(100);
        }

    };

    const totalCost = (() => {
        let s = 0;
        for (let i = 0; i < cartItems.length; i++) {
            s += cartItems[i].item.price * cartItems[i].frequency;
        }
        return s;
    })();

    const updateCartItems = ({ item, frequency }) => {

        const newCartItems = [...cartItems];

        const index = newCartItems.findIndex((value) => value.item._id === item._id);

        let cartItem = index !== -1 ? newCartItems[index] : null;

        if (index === -1 && frequency > 0) {
            cartItem = {
                item,
                frequency
            };

            newCartItems.push(cartItem);
        }

        if (!cartItem)
            return;

        if (frequency === 0) {
            // Remove item
            newCartItems.splice(index, 1);
        }
        else {
            // Update item
            cartItem.frequency = frequency;
        }

        setCartItems(newCartItems);

    };

    const fetchCartItem = (item) => {
        return cartItems.find((value) => value.item._id === item._id);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, updateCartItems, fetchCartItem, placeOrder, totalCost, orders, setOrders, getAllOrders }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;