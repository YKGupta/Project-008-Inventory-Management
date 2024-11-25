import { useContext, useState } from "react";
import ItemsContext from "./ItemsContext";
import AlertContext from "./AlertContext";
import ProgressContext from "./ProgressContext";

const ItemsProvider = (props) => {

	const [items, setItems] = useState([]);
	const { alertSetter } = useContext(AlertContext);
	const { setProgress } = useContext(ProgressContext);

	const getAllItems = async () => {

		setProgress(10);
		
		try
		{
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/inventory/getall`, {
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
				setItems(json.items);
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

	const addItem = async ({ name, qty, price, unit, category, imageURL }) => {

		setProgress(10);

		try
		{
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/inventory/add`, {
				method: "POST",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, qty, price, unit, category, imageURL
				})
			});

			setProgress(50);

			const json = await response.json();

			setProgress(90);

			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				const newItems = items.concat(json.item);
				setItems(newItems);
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

	};

	const deleteItem = async ({ _id }) => {

		setProgress(10);

		try
		{
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/inventory/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Auth-Token": localStorage.getItem('token')
				}
			});

			setProgress(50);
			
			const json = await response.json();

			setProgress(90);
			
			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				const newItems = items.filter((x) => x._id !== _id);
				setItems(newItems);
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

	const updateItem = async ({ _id, name, price, unit, qty, category, imageURL }) => {

		setProgress(10);

		try
		{
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/inventory/update/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type":"application/json",
					"Auth-Token":localStorage.getItem('token')
				},
				body: JSON.stringify({
					name, price, unit, qty, category, imageURL
				})
			});

			setProgress(50);
			
			const json = await response.json();
			
			setProgress(90);

			if(json.success)
			{
				// Update frontend
				alertSetter({ message: json.message, type: "warning"});
				
				const newItems = JSON.parse(JSON.stringify(items));
				for(let i = 0; i < newItems.length; i++)
				{
					if(newItems[i]._id === _id)
					{
						newItems[i].name = name;
						newItems[i].price = price;
						newItems[i].unit = unit;
						newItems[i].qty = qty;
						newItems[i].category = category;
						newItems[i].imageURL = imageURL;
						break;
					}
				}

				setItems(newItems);
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

	return (
		<ItemsContext.Provider value={{ items, setItems, getAllItems, addItem, deleteItem, updateItem }}>
			{props.children}
		</ItemsContext.Provider>
	);
};

export default ItemsProvider;