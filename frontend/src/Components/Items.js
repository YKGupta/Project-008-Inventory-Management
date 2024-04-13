import React, { useContext, useEffect, useRef, useState } from 'react'
import ItemsContext from '../Context/ItemsContext'
import Item from './Item';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import { useNavigate } from 'react-router-dom';
import './Items.css';
import DashboardInfo from './DashboardInfo';

const Items = () => {

    const { items, getAllItems } = useContext(ItemsContext);
    const [updatedItem, setUpdatedItem] = useState({ _id: "", name: "", qty: "" });
    const { updateItem } = useContext(ItemsContext);
    const closeRef = useRef(null);
    const navigate = useNavigate();

    const setUpdateModal = (itemToBeUpdated) => {
        setUpdatedItem(itemToBeUpdated);
    };

    const update = () => {
        updateItem(updatedItem);
        closeRef.current.click();
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        getAllItems();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <DashboardInfo />
            <AddItem />
            <UpdateItem closeRef={closeRef} update={update} updatedItem={updatedItem} setUpdatedItem={setUpdatedItem} />
            <h2>Items</h2>
            <div className='row'>
                {items.map((item) => <Item item={item} key={item._id} setUpdateModal={setUpdateModal} />)}
            </div>
            <div className="container my-5">
                <button type="button" className="itemsBtn" data-bs-toggle="modal" data-bs-target="#addItemModal">Add Item</button>
            </div>
        </>
    )
}

export default Items
