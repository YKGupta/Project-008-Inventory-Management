import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../Context/CartContext';
import './Orders.css';

const Orders = () => {

    const { orders, getAllOrders } = useContext(CartContext);

    useEffect(() => {

        if(!localStorage.getItem('token')){
            return;
        }

        getAllOrders();
        
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container my-4 orders">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <h2>{localStorage.getItem('admin') === 'true' ? 'All' : 'Your'} Orders</h2>
                <p className='text-secondary'>{orders.length}</p>
            </div>
            <div className="container my-4">
                {
                    orders.map((x, i) => 
                        <div key={x._id}>
                            <div className="row m-auto my-3 col-12 d-flex align-items-center justify-content-start">
                                {/* <img className='col-2' src='https://m.media-amazon.com/images/I/71+bhwHukCL.jpg' alt="img" /> */}
                                <div className='col-6'>
                                    <p style={{ fontSize: '11px' }}>Order Id: {x._id}</p>
                                    <p>User Id: {x.userId}</p>
                                </div>
                                <div className='col-2'>
                                    <p className='text-center'>&#10005;&nbsp;{x.items.length} Items</p>
                                </div>
                                <div className='col-4'>
                                    <p className='text-center'>₹{x.totalPrice}</p>
                                </div>
                            </div>
                            {
                                i !== orders.length - 1 && <div className="line-b"></div>
                            }
                        </div>
                    )
                }

            </div>
            <Link role="button" className="btn" to='/'>&larr; Back to Shop</Link>
        </div>
    )
}

export default Orders;
