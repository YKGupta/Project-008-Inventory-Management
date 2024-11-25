import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CartContext from "./CartContext";
import AlertContext from "./AlertContext";
import ProgressContext from "./ProgressContext";
import loadScript from "../Utility/loadScript";

const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const { alertSetter } = useContext(AlertContext);
    const { setProgress } = useContext(ProgressContext);

    const getAllOrders = async () => {

        setProgress(10);

        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/order/getall${localStorage.getItem('admin') === 'false' ? 'user' : ''}`, {
                method: "GET",
                headers: {
                    "Auth-Token": localStorage.getItem('token')
                }
            });

            setProgress(50);

            const json = await response.json();

            setProgress(90);

            if (json.success) {
                setOrders(json.orders);
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
    }

    const placeOrder = async () => {

        setProgress(10);

        try 
        {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                alertSetter({ message: "Unable to connect", type: "danger" });
                return;
            }

            const orderResponse = await fetch(`${process.env.REACT_APP_HOST}/api/payment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth-Token": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    totalAmount: totalCost
                })
            });

            const orderData = await orderResponse.json();

            const { amount, id: order_id, currency } = orderData.order;

            const options = {
                key: "rzp_test_ZYDPQ7TGPxay6A", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "Test",
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    const r = await fetch(`${process.env.REACT_APP_HOST}/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Auth-Token": localStorage.getItem('token')
                        },
                        body: JSON.stringify(data)
                    });
                    const d = await r.json();
                    if(d.success)
                    {
                        const response = await fetch(`${process.env.REACT_APP_HOST}/api/order/add`, {
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
                },
                prefill: {
                    name: "Test",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Test",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
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