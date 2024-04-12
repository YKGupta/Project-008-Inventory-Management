import { useState } from "react";
import ItemsContext from "./ItemsContext";

const ItemsProvider = (props) => {

	const [items, setItems] = useState([]);

	const host = "http://localhost:5000";

	const getAllItems = async () => {

		try
		{
			const response = await fetch(`${host}/api/inventory/getall`, {
				method: "GET",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});
	
			const json = await response.json();
			if(json.success)
			{
				setItems(json.items);
			}
			else
			{
				alert(json.message);
			}
		}
		catch(error)
		{
			alert(error);
		}
	}

	const addItem = async ({ name, qty }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/add`, {
				method: "POST",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, qty
				})
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alert(json.message);
				const newItems = items.concat(json.item);
				setItems(newItems);
			}
			else
			{
				alert(json.message);
			}

		}
		catch(error)
		{
			alert(error);
		}

	};

	const deleteItem = async ({ _id }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alert(json.message);
				const newItems = items.filter((x) => x._id !== _id);
				setItems(newItems);
			}
			else
			{
				alert(json.message);
			}

		}
		catch(error)
		{
			alert(error);
		}

	}

	const updateItem = async ({ _id, name, qty }) => {

		try
		{
			const response = await fetch(`${host}/api/inventory/update/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, qty
				})
			});

			const json = await response.json();

			if(json.success)
			{
				// Update frontend
				alert(json.message);
				
				const newItems = JSON.parse(JSON.stringify(items));
				for(let i = 0; i < newItems.length; i++)
				{
					if(newItems[i]._id === _id)
					{
						newItems[i].name = name;
						newItems[i].qty = qty;
						break;
					}
				}

				setItems(newItems);
			}
			else
			{
				alert(json.message);
			}

		}
		catch(error)
		{
			alert(error);
		}

	}

	return (
		<ItemsContext.Provider value={{ items, setItems, getAllItems, addItem, deleteItem, updateItem }}>
			{props.children}
		</ItemsContext.Provider>
	);
};

export default ItemsProvider;