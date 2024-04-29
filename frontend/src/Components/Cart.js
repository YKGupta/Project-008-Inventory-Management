import './Cart.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../Context/CartContext';

const Cart = () => {

    const { cartItems, totalCost, placeOrder } = useContext(CartContext);

    const handleOrderClick = () => {
        placeOrder();
    };

    return (
        <div className="cart container d-flex align-items-start justify-content-between my-4">
            <div className="container col-8" id='cart-left'>
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    <h2>Shopping Cart</h2>
                    <p className='text-secondary'>{ cartItems.length } items</p>
                </div>
                <div className="container my-4" id='cart-items-container'>
                    {
                        cartItems.map((x, i) => {
                            return (
                                <div key={x.item._id}>
                                    <div className="row m-auto my-3 col-12 d-flex align-items-center justify-content-start">
                                        <img className='col-2' src={x.item.imageURL} alt="img" />
                                        <div className='col-4'>
                                            <p style={{fontSize: '11px'}}>{x.item.category}</p>
                                            <p>{x.item.name}</p>
                                        </div>
                                        <div className='col-2'>
                                            <p className='text-center'>&#10005;&nbsp;{x.frequency} {x.item.unit}</p>
                                        </div>
                                        <div className='col-4'>
                                            <p className='text-center'>₹{x.item.price}/{x.item.unit}</p>
                                        </div>
                                        {/* <div className='col-2 text-center'>
                                            <button type="button" class="btn-close" aria-label="Close"></button>
                                        </div> */}
                                    </div>
                                    {
                                        i !== cartItems.length-1 && <div className="line-b"></div>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                <Link role="button" className="btn" to='/'>&larr; Back to Shop</Link>
            </div>
            <div className="container col-4 p-4" id='card-right'>
                <h4>Summary</h4>
                <div className="line-b2"></div>
                <div className="container my-4 d-flex align-items-center justify-content-between">
                    <p className="text-uppercase">Items { cartItems.length }</p>
                    <p>₹{totalCost}</p>
                </div>
                <button type="button" className="btn" onClick={handleOrderClick}>Place Your Order &rarr;</button>
            </div>
        </div>
    )
}

export default Cart;
