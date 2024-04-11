import React, { useContext, useRef, useState } from 'react'
import ItemsContext from '../Context/ItemsContext';

const AddItem = () => {

    const closeRef = useRef(null);
    const [ item, setItem ] = useState({ name: "", qty: "" });
    const { addItem } = useContext(ItemsContext);

    const onChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleAddClick = () => {
        addItem(item);
        closeRef.current.click();
    };

    return (
        <div className="modal fade" id="addItemModal" tabIndex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addItemModalLabel">Add Item</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Item Name</label>
                                <input type="text" className="form-control" id="name" name="name" onChange={ onChange } />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="qty" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="qty" name="qty" onChange={ onChange } />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                        <button disabled={ item.name.trim() === "" || item.qty.trim() === 
                    "" } type="button" className="btn btn-primary" onClick={ handleAddClick }>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem;
