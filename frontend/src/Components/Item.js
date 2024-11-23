import React, { useContext, useState } from 'react'
import ItemsContext from '../Context/ItemsContext';
import CartContext from '../Context/CartContext';
import './Item.css';

const Item = ({ item, setUpdateModal }) => {

    const { deleteItem } = useContext(ItemsContext);
    const { updateCartItems, fetchCartItem } = useContext(CartContext);
    let temp = fetchCartItem(item);
    temp = temp ? temp.frequency : 0;
    const [frequency, setFrequency] = useState(temp);

    const changeItemFrequency = (amt = 1) => {
        const newFrequency = frequency + amt;
        updateCartItems({ item, frequency: newFrequency });
        setFrequency(newFrequency);
    };

    const handleDeleteClick = () => {
        deleteItem(item);
    };

    const handleUpdateClick = () => {
        setUpdateModal(item);
    };

    return (
        <div className="card col-md-3 m-2">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {item.category}
                <span className="visually-hidden">category</span>
            </span>
            <img src={item.imageURL} className="card-img-top my-3 rounded" style={{ width: "100%", aspectRatio: "6 / 4", objectFit: "cover" }} alt=""></img>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                {
                    localStorage.getItem('admin') === 'true' ? 
                    <>
                        <p className="card-text my-2">Price: {item.price}/{item.unit}</p>
                        <p className="card-text my-2 mb-2">Quantity: {item.qty}</p>
                        <i className="fa-solid fa-trash" onClick={handleDeleteClick}></i>
                        <i className="fa-solid fa-pen-to-square mx-4" data-bs-toggle="modal" data-bs-target="#updateItemModal" onClick={handleUpdateClick}></i>
                    </>
                    :
                    <>
                        <p className="card-text my-2">Price: {item.price}/{item.unit}</p>
                        <div className="container d-flex align-items-center justify-content-center">
                            {
                                item.qty === 0 ? 
                                <p className="mx-2 mb-0 text-secondary">Not in stock</p>
                                : frequency === 0 &&
                                <p className="mx-2 mb-0">Add to cart</p>
                            }
                            {
                                frequency < item.qty ?
                                <i className="fa-solid fa-plus" onClick={() => changeItemFrequency(1)}></i> :
                                item.qty > 0 &&
                                <p className="mx-2 mb-0" style={{fontSize: '11.5px'}}>No more available</p>
                            }
                            {
                                frequency > 0 &&
                                <>
                                    <p className="mx-2 mb-0">{frequency}</p>
                                    <i className="fa-solid fa-minus" onClick={() => changeItemFrequency(-1)}></i>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Item
